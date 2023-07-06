'use client'

import { Button, TextField } from "@mui/material";
import { FormEvent, useRef, useState } from "react";

export default function PromptInput() {
	const [isLoading, setIsLoading] = useState(false)
	const userPrompt = useRef<HTMLInputElement>()

	const startCreation = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const prompt = userPrompt.current?.value
		if (!prompt) return alert('The promp cannot be empty')

		setIsLoading(true)

		setTimeout(() => {
			alert('your website is ready!')
			setIsLoading(false)
		}, 2000)


		// call the api with the userPrompt value
	}

	if (isLoading) return <h1>Loading {userPrompt.current?.value} website...</h1>

	return (
		<>
			<h2>What kind of website do you want to build?</h2>
			<form onSubmit={startCreation} style={{ display: 'flex', flexDirection: 'column' }}>
				<TextField inputRef={userPrompt} id="user-prompt" label="Prompt" />
				<Button style={{ marginTop: '10px' }} className="" type="submit" variant="contained" color="success">Generate!</Button>
			</form>
		</>
	)
}
