'use client'

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";

export default function PromptInput() {
	const [isLoading, setIsLoading] = useState(false)
	const userPrompt = useRef<HTMLInputElement>()

	const startCreation = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const prompt = userPrompt.current?.value
		if (!prompt) return alert('The promp cannot be empty')

		setIsLoading(true)

		// call the api with the userPrompt value
		const raw = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({ userPrompt: prompt })
		})
		const res  = await raw.json()
		setIsLoading(false)

		history.go(res.url)
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
