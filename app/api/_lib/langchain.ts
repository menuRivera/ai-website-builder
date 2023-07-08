import { OpenAI } from "langchain/llms/openai";
import { componentPrompt, imagesPrompt, routesPrompt } from "./prompts";
import { RequiredImage, Page } from "./interfaces";

// Export the client ready to be used
// In order to use the OpenAI wrapper, you must have an env variable called 
// OPENAI_API_KEY set 

const gpt4 = new OpenAI({
	// modelName: 'gpt-3.5-turbo',
	modelName: 'gpt-4',
	temperature: 0.9
})
const gpt3 = new OpenAI({
	modelName: 'gpt-3.5-turbo',
	// modelName: 'gpt-4',
	temperature: 0.9
})

export const getPagesArray = async (userPrompt: string): Promise<Page[]> => {
	// Format the prompt
	const prompt = await routesPrompt.format({ userPrompt })

	// Make the request
	const response = await gpt3.call(prompt)
	
	// Parse the response
	const pages: Page[] = JSON.parse(response)
	console.log({pages})

	return pages
}

export const getRequiredImagesArray = async (userPrompt: string, pages: Page[]): Promise<RequiredImage[]> => {
	// Format the prompt
	const prompt = await imagesPrompt.format({
		userPrompt,
		pages: JSON.stringify(pages)
	})

	// Make the request
	const response = await gpt4.call(prompt)

	// Parse the response
	const requiredImages: RequiredImage[] = JSON.parse(response)
	console.log({requiredImages})

	return requiredImages	
}

export const getPageComponent = async (userPrompt: string, routes: string[], page: Page, images: any): Promise<string> => {
	const { title, description, route } = page

	// Format the prompt
	const prompt = await componentPrompt.format({
		userPrompt,
		routes: JSON.stringify(routes),
		pageTitle: title,
		pageRoute: route,
		pageDescription: description,
		images: JSON.stringify(images)
	})
	
	const component: string = await gpt4.call(prompt)

	console.log(`${route} component generated!`)
	return component
}
