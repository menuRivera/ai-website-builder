import { PromptTemplate } from "langchain";

export const routesPrompt = new PromptTemplate({
	inputVariables: ['userPrompt'],
	template: `
	Given a website description, you must generate a list of pages in json format that will be required for that website.
	Don't include nested routes for now

	DESCRIPTION:
	An university website

	PAGES:
	[
		{{
			"title": "Home",
			"route": "/",
			"description": "The home page for the university website, contains information of the campus, contact information and links to the other pages, contains a landing page, followed by some photos of the campus, reviews of previous students and a contact us segment"
		}},
		{{
			"title": "Careers",
			"route": "/careers",
			"description": "A page with information about what careers the university offers, consists a table of careers with the columns 'Career', 'Description' and 'Tuition fee'"
		}}
	]	

	DESCRIPTION:
	{userPrompt}

	PAGES:
	`
})

export const imagesPrompt = new PromptTemplate({
	//pendiente
	inputVariables: [],
	template: ` `
})

export const componentPrompt = new PromptTemplate({
	inputVariables: ['userPrompt', 'routes', 'pageTitle', 'pageRoute', 'pageDescription'],
	template: `
	For each page description provided, you must create a nextjs component considering the next context
	- It is a nexjs project using the pages routing system
	- It uses MUI component library
	- You can create links to any website route you consider necessary using the nextjs Link component and not the <a> tag
	- Use https://picsum.photos/ for images placeholders
	- Import every MUI component you use

	WEBSITE INFORMATION:
	description: An university website
	routes: ["/", "/careers"]

	PAGE INFORMATION:
	title: Home
	route: /
	description: The home page for the university website, contains information of the campus, tuiton facilities and links to the other pages, followed by some photos of the campus, reviews of previous students and a contact us block

	NEXTJS COMPONENT:
	import {{ Box, Button, Typography }} from "@mui/material";
	import Link from "next/link";

	export default function Home() {{
		return (
			<Box sx={{{{ textAlign: 'center' }}}}>
				<Box sx={{{{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}}}>
					<Box>
						<Typography variant="h2" component="h1" gutterBottom>
							University of Colorado
						</Typography>
						<Typography variant="body1" component="p">
							Empowering Minds, Igniting Potential
						</Typography>
						<Button sx={{{{marginTop: '20px'}}}} variant="contained"><Link href='/careers'>Explore careers</Link></Button>
					</Box>
				</Box>

				<Box sx={{{{ backgroundColor: '#f0f0f0', padding: '50px' }}}}>
					<Typography variant="h4" component="h2" gutterBottom>
						Our Campus
					</Typography>
					<Box sx={{{{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}}}>
						<img src="https://picsum.photos/300/200?random=1" alt="Campus 1" width="300" height="200" />
						<img src="https://picsum.photos/300/200?random=2" alt="Campus 2" width="300" height="200" />
						<img src="https://picsum.photos/300/200?random=3"campus3.png" alt="Campus 3" width="300" height="200" />
					</Box>
				</Box>

				<Box sx={{{{ marginTop: '100px' }}}}>
					<Typography variant="h4" component="h2" gutterBottom>
						Students opinions
					</Typography>
					<Typography variant="body1" component="p">
						"The University of Colorado has provided me with an incredible educational experience." - Juan Pérez
					</Typography>
					<Typography variant="body1" component="p">
						"I appreciate the University of Colorado for its strong academic programs and research opportunities." - María Gómez
					</Typography>
					<Typography variant="body1" component="p">
						"The University of Colorado has been a transformative experience for me. " - Carlos Rodríguez
					</Typography>
				</Box>

				<Box sx={{{{ marginTop: '100px' }}}}>
					<Typography variant="h4" component="h2" gutterBottom>
						Contact
					</Typography>
					<Typography variant="body1" component="p">
						Address: 2055 Regent Drive, Boulder, CO 80309, United States
					</Typography>
					<Typography variant="body1" component="p">
						Phone: +1 123-456-7890
					</Typography>
					<Typography variant="body1" component="p">
						Email: info@universityofcolorado.edu
					</Typography>
				</Box>
			</Box>
		)
	}}

	WEBSITE INFORMATION:
	description: {userPrompt}
	routes: {routes}

	PAGE INFORMATION:
	title: {pageTitle}
	title: {pageRoute}
	description: {pageDescription}

	NEXTJS COMPONENT:

	`
})
