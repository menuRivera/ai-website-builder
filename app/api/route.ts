import { exec } from "child_process";
import { NextResponse } from "next/server";
import { getPagesArray } from "./_lib/langchain";
import { Page } from "./_lib/interfaces";

// __dirname is equal to ai-website-builder/.next/server/app/api
// route: /api

// The route and method are irrelevant right now because of the
// demostrative nature of the project. What is important though, is 
// the fact that it is being executed on the server side.

export async function GET(request: Request) {
	console.log(request)
	const req = await request.json()

	const { userPrompt } = req
	console.log({userPrompt})
	// const dirPath = path.join(__dirname, '/testDir')
	// fs.mkdirSync(dirPath)

	// --- Things to request to ai ---
	// An array with the pages (title, route and description)
	// The component for each page
	// The assets

	const pages: Page[] = await getPagesArray(userPrompt)

	// Create the base project
	// clone https://github.com/menuRivera/base-nextjs-template	
	// console.log(await execute(`sh scripts/clone-base-project.sh`))
	// console.log(await execute('git clone https://github.com/menuRivera/base-nextjs-template'))

	// Contextualize the ai about the structure and dependencies of the base project

	// Ask it the generate the required components and pages for the website in an 
	// array of the form [{title, description, route}]

	// Make the necesary modifications to the base project using predefined
	// bash scripts and the information from the ai
	return NextResponse.json({ success: true })
}

const execute = (command: string) => {
	// function for executing shell commands with ease
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (!error) return resolve(stdout)
			reject(error || stderr)
		})
	})
}
