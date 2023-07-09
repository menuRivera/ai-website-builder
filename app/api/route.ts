import { exec, spawn } from "child_process";
import { NextResponse } from "next/server";
import { getPageComponent, getPagesArray, getRequiredImagesArray } from "./_lib/langchain";
import { RequiredImage, Page, Image } from "./_lib/interfaces";
import * as fs from "node:fs";
import { createImage } from "./_lib/openai";

// __dirname is equal to ai-website-builder/.next/server/app/api
// route: /api

// The route and method are irrelevant right now because of the
// demostrative nature of the project. What is important though, is 
// the fact that it is being executed on the server side.
export async function POST(request: Request) {
	try {
		console.time('total')
		const req = await request.json()
		const { userPrompt } = req

		console.log(`\nCreating a website with "${userPrompt}" as user prompt...\n`)

		// --- Things to request to ai ---
		// An array with the pages (title, route and description)
		// The component for each page
		// The assets?

		// Get the new project routes
		console.time('routes')
		console.log('Generating the routes for the website...')
		const pages: Page[] = await getPagesArray(userPrompt)
		const routes: string[] = pages.map(page => page.route)
		console.log('Done!')
		console.timeEnd('routes')
		console.timeLog('total')

		// Get the required images information
		console.time('requiredImages')
		console.log('Generating the required images information for the website...')
		const requiredImages: RequiredImage[] = await getRequiredImagesArray(userPrompt, pages)
		console.log('Done!')
		console.timeEnd('requiredImages')
		console.timeLog('total')

		// Prepare the base project to work on
		console.time('project')
		try {
			console.log('Stopping deployments if any...')
			await execute('pkill http-server')
		} catch (error) {
			console.log('No previous deployments found')
		}
		console.log('Removing previous generated project if any...')
		await execute('rm -rf generated')
		console.log('Preparing the base project...')
		await execute('git clone -b bootstrap https://github.com/menuRivera/base-nextjs-template generated')
		await execute('npm install --prefix generated')
		await execute('rm ./generated/pages/index.js')
		console.timeEnd('project')
		console.timeLog('total')

		// Create the required images using dall-e
		console.time('images')
		console.log('Creating the required images...\n')
		const imagesPromises: Promise<Image>[] = requiredImages.map(requiredImage => createImage(requiredImage, userPrompt))
		const images: Image[] = await Promise.all(imagesPromises)
		const imagesObject: any = new Object()
		images.forEach(image => {
			imagesObject[image.title] = {
				description: image.description,
				url: image.url,
			}
		})
		console.log({ imagesObject })
		console.timeEnd('images')
		console.timeLog('total')

		// Creating the images json file
		const imagesFile = fs.createWriteStream('./generated/utils/images.json')
		imagesFile.write(JSON.stringify(imagesObject))
		imagesFile.end()

		// Create the pages inside @/generated/pages
		console.time('components')
		console.log('Creating a nextjs component for each route... \n')

		const componentsPromises: Promise<string>[] = pages.map(page => getPageComponent(userPrompt, routes, page, imagesObject))
		const components: string[] = await Promise.all(componentsPromises)
		const pagesFilenames: string[] = pages.map(page => {
			const filename: string = page.route == '/' ? '/index.jsx' : `${page.route}.jsx`
			return filename
		})
		pagesFilenames.forEach((filename, index) => {
			const stream = fs.createWriteStream(`./generated/pages${filename}`)
			stream.write(components[index])
			stream.end()
		})

		console.log('Done!')
		console.timeEnd('components')
		console.timeLog('total')

		// deploy the generated project
		console.time('deployment')
		console.log('Building for production...')
		await execute('npm run build --prefix generated')
		console.log('Deploying...')
		spawn('http-server', ['-p', '8080', 'generated/out/'])
			.on('error', err => console.error(err))
			.on('message', msg => console.log(msg))
		console.log('Done!')
		console.timeEnd('deployment')

		console.timeEnd('total')

		return NextResponse.json({ success: true, pages, routes, url: 'http://localhost:8080' })
	} catch (error) {
		console.timeEnd('routes')
		console.timeEnd('requiredImages')
		console.timeEnd('project')
		console.timeEnd('images')
		console.timeEnd('components')
		console.timeEnd('deployment')
		console.timeEnd('total')
		console.error(error)

		return NextResponse.json({ success: false, message: error })
	}
}

const execute = (command: string) => {
	// function for executing shell commands with ease
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (!error) {
				console.log(stdout)
				return resolve(stdout)
			}

			reject(error || stderr)
		})
	})
}

