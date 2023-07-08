import { Configuration, OpenAIApi } from "openai";
import { Image, RequiredImage } from "./interfaces";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export const createImage = async (requiredImage: RequiredImage): Promise<Image> => {
	const response = await openai.createImage({
		prompt: requiredImage.description,
		n: 1,
		size: '512x512'
	})

	const image: Image = {
		...requiredImage,
		url: response.data.data[0].url || 'https://picsum.photos/200/300'
	}
	return image
}
