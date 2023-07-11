import Link from "next/link";

export default function Generated() {
	return (
		<div style={{padding: '1vh', height: '96vh'}}>
			<Link href='/'>Go back</Link>
			<iframe style={{width: '100%', height: '100%'}} src="http://localhost:8080" title="The generated website"/>
		</div>
	)
}
