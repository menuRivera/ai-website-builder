'use client'

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";

const env = process.env.NODE_ENV || 'development'

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
		console.log({res})
		if(res.success) {
			// open one site or another depending on the env
			if (env == 'development') return window.open('http://localhost:8080')
			return window.open('http://143.198.103.86:8080')
		} 
		
		alert(JSON.stringify(res.message))
	}

	if (isLoading) return <h1>Creating {userPrompt.current?.value} ...</h1>

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
