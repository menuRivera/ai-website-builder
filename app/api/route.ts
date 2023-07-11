import { exec, spawn } from "child_process";
import { NextResponse } from "next/server";
import { getFooterComponent, getNavbarComponent, getPageComponent, getPagesArray, getRequiredImagesArray } from "./_lib/langchain";
import { RequiredImage, Page, Image } from "./_lib/interfaces";
import * as fs from "node:fs";
import { createImage } from "./_lib/openai";
import { log, time, timeEnd, timeLog, error } from "console";

// route: /api

// The route and method are irrelevant right now because of the
// demostrative nature of the project. What is important though, is 
// the fact that it is being executed on the server side.
export async function POST(request: Request) {
	try {
		time('total')
		const req = await request.json()
		const { userPrompt } = req

		log(`\nCreating a website with "${userPrompt}" as user prompt...\n`)

		// --- Things to request to ai ---
		// An array with the pages (title, route and description)
		// The component for each page
		// The assets?

		// Get the new project routes
		time('routes')
		log('Generating the routes for the website...')
		const pages: Page[] = await getPagesArray(userPrompt)
		const routes: string[] = pages.map(page => page.route)
		log('Done!')
		timeEnd('routes')
		timeLog('total')

		// Get the required images information
		time('requiredImages')
		log('Generating the required images information for the website...')
		const requiredImages: RequiredImage[] = await getRequiredImagesArray(userPrompt, pages)
		log('Done!')
		timeEnd('requiredImages')
		timeLog('total')

		// Prepare the base project to work on
		time('project')
		try {
			log('Stopping deployments if any...')
			await execute('pkill http-server')
		} catch (err) {
			log('No previous deployments found')
		}
		log('Removing previous generated project if any...')
		await execute('rm -rf generated')
		log('Preparing the base project...')
		await execute('git clone -b bootstrap https://github.com/menuRivera/base-nextjs-template generated')
		await execute('npm install --prefix generated')
		await execute('rm ./generated/pages/index.js')
		timeEnd('project')
		timeLog('total')

		// Create the required images using dall-e
		time('images')
		log('Creating the required images...\n')
		const imagesPromises: Promise<Image>[] = requiredImages.map(requiredImage => createImage(requiredImage, userPrompt))
		const images: Image[] = await Promise.all(imagesPromises)
		const imagesObject: any = new Object()
		images.forEach(image => {
			imagesObject[image.title] = {
				description: image.description,
				url: image.url,
			}
		})
		log({ imagesObject })
		timeEnd('images')
		timeLog('total')

		// Creating the images json file
		const imagesFile = fs.createWriteStream('./generated/utils/images.json')
		imagesFile.write(JSON.stringify(imagesObject))
		imagesFile.end()

		// Create the pages inside @/generated/pages
		time('components')
		log('Creating the required nextjs components... \n')

		// Get the components promises
		const navbarPromise: Promise<string> = getNavbarComponent(userPrompt, routes, imagesObject)
		const footerPromise: Promise<string> = getFooterComponent(userPrompt, routes)
		const componentsPromises: Promise<string>[] = pages.map(page => getPageComponent(userPrompt, routes, page, imagesObject))

		// Resolve the promises
		const [navbar, footer, ...components]: string[] = await Promise.all([navbarPromise, footerPromise, ...componentsPromises])

		// Inject the components into the generated project corresponding files

		pages.forEach((page, index) => {
			// Create the files for the pages' components
			const filename: string = page.route == '/' ? '/index.jsx' : `${page.route}.jsx`

			const stream = fs.createWriteStream(`./generated/pages${filename}`)
			stream.write(components[index])
			stream.end()
		})


		const navbarFileStream = fs.createWriteStream('./generated/components/navbar.jsx')
		navbarFileStream.write(navbar)
		navbarFileStream.end()

		const footerFileStream = fs.createWriteStream('./generated/components/footer.jsx')
		footerFileStream.write(footer)
		footerFileStream.end()

		log('Done!')
		timeEnd('components')
		timeLog('total')

		// deploy the generated project
		time('deployment')
		log('Building for production...')
		await execute('npm run build --prefix generated')
		log('Deploying...')
		spawn('http-server', ['-p', '8080', 'generated/out/'])
			.on('error', err => error(err))
			.on('message', msg => log(msg))
		log('Done!')
		timeEnd('deployment')

		timeEnd('total')

		return NextResponse.json({ success: true, pages, routes, url: 'http://localhost:8080' })
	} catch (err) {
		timeEnd('routes')
		timeEnd('requiredImages')
		timeEnd('project')
		timeEnd('images')
		timeEnd('components')
		timeEnd('deployment')
		timeEnd('total')
		error(err)

		return NextResponse.json({ success: false, message: err })
	}
}

const execute = (command: string) => {
	// function for executing shell commands with ease
	return new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			if (!err) {
				log(stdout)
				return resolve(stdout)
			}

			reject(err || stderr)
		})
	})
}

