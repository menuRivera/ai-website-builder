import { OpenAI } from "langchain/llms/openai";
import { routesPrompt } from "./prompts";
import { Page } from "./interfaces";

// Export the client ready to be used
// In order to use the OpenAI wrapper, you must have an env variable called 
// OPENAI_API_KEY set 

export const model = new OpenAI({
	modelName: 'gpt-4',
	temperature: 0.9
})

export const getPagesArray = async (userPrompt: string): Promise<Page[]> => {
	// Format the prompt
	const prompt = await routesPrompt.format({userPrompt})

	// Make the request
	const pages: Page[] = JSON.parse(await model.call(prompt))

	console.log({pages})

	return pages
}
