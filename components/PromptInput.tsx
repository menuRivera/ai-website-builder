'use client'

import { TextField } from "@mui/material";

export default function PromptInput() {
	return (
		<>
			<h2>What kind of website do you want to build?</h2>
			<TextField id="user-prompt" label="Prompt"/>
		</>
	)
}
