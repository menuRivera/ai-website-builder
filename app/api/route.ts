import { exec, spawn } from "child_process";
import { NextResponse } from "next/server";
import { getPageComponent, getPagesArray } from "./_lib/langchain";
import { Page } from "./_lib/interfaces";
import * as fs from "node:fs";

// __dirname is equal to ai-website-builder/.next/server/app/api
// route: /api

// The route and method are irrelevant right now because of the
// demostrative nature of the project. What is important though, is 
// the fact that it is being executed on the server side.
export async function POST(request: Request) {
	const req = await request.json()
	const { userPrompt } = req

	console.log(`\nCreating a website with "${userPrompt}" as user prompt...\n`)

	// --- Things to request to ai ---
	// An array with the pages (title, route and description)
	// The component for each page
	// The assets?

	// Get the new project routes
	console.log('Generating the routes for the website...')
	const pages: Page[] = await getPagesArray(userPrompt)
	const routes: string[] = pages.map(page => page.route)
	console.log('Done!')

	// Prepare the base project to work on
	console.log('Removing previous project (if any)...')
	await execute('rm -rf generated')
	console.log('Preparing the base project...')
	await execute('git clone https://github.com/menuRivera/base-nextjs-template generated')
	await execute('npm install --prefix generated')
	await execute('rm ./generated/pages/index.js')

	// Create the pages inside @/generated/pages
	console.log('Creating a file for each route... \n')

	const componentsPromises: Promise<string>[] = pages.map(page => getPageComponent(userPrompt, routes, page))
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

	// todo: deploy the generated project

	// return NextResponse.redirect('localhost:3001')
	return NextResponse.json({ success: true, pages, routes })
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
