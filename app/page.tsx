import PromptInput from "./components/PromptInput";

export default function Home() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '300px' }}>
			<h1>AI website builder</h1>
			<PromptInput />
		</div>
	)
}
