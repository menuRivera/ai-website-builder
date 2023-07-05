'use client'

import { Button, TextField } from "@mui/material";
import { FormEvent, useRef } from "react";

export default function PromptInput() {
	const userPrompt = useRef<HTMLInputElement>()

	const startCreation = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		alert(userPrompt.current?.value)
	}

	return (
		<>
			<h2>What kind of website do you want to build?</h2>
			<form onSubmit={startCreation} style={{display: 'flex', flexDirection: 'column'}}>
				<TextField inputRef={userPrompt} id="user-prompt" label="Prompt" />
				<Button style={{marginTop: '10px'}} className="" type="submit" variant="contained" color="success">Generate!</Button>
			</form>
		</>
	)
}
