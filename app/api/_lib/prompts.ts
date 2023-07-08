import { PromptTemplate } from "langchain/prompts";

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
	inputVariables: ['userPrompt', 'pages'],
	template: `
	Given an array of pages of a given website, you must infer the required images for the website and create a json object declaring the title and the description of the image.

	WEBSITE:
	An university website

	PAGES:
	[{{ "title": "Home", "route": "/", "description": "The home page for the university website, contains information of the campus, contact information and links to the other pages, contains a landing page, followed by some photos of the campus, reviews of previous students and a contact us segment" }}, {{ "title": "Careers", "route": "/careers", "description": "A page with information about what careers the university offers, consists a table of careers with the columns 'Career', 'Description' and 'Tuition fee'" }} ]	

	IMAGES:
	[
		{{
			"title": "universityLogo",
			"description": "A university logo"
		}},
		{{
			"title": "homePageBackground",
			"description": "The background image for the home page of a university website, shows the main building and a few students passing by"
		}},
		{{
			"title": "campus1",
			"description": "A picture of an university campus, showing the main building"
		}},
		{{
			"title": "campus2",
			"description": "A picture of an university campus"
		}},
		{{
			"title": "campus3",
			"description": "A picture of an university campus"
		}},
		{{
			"title": "engineerStudent",
			"description": "A picture of an engineer student working on something"
		}},
		{{
			"title": "medicineStudent",
			"description": "A picture of a medicine student checking the pulse of someone"
		}},
		{{
			"title": "universityFootballPlayer",
			"description": "A football player from an university playing on the with other studets court"
		}},
	]

	WEBSITE: 
	{userPrompt}

	PAGES: 
	{pages}

	IMAGES:
	`
})

export const componentPrompt = new PromptTemplate({
	inputVariables: ['userPrompt', 'routes', 'pageTitle', 'pageRoute', 'pageDescription', 'images'],
	template: `
	For each page description provided, you must create a nextjs component considering the next context
	- It is a nexjs project using the pages routing system
	- It uses MUI component library
	- You can create links to any website route you consider necessary using the nextjs Link component and not the <a> tag
	- Use the images provided at @/utils/images.json
	- Import every MUI component you use
	- Play with the colors to make it look professional

	WEBSITE INFORMATION:
	description: An university website
	routes: ["/", "/careers"]
	images: {{ "universityLogo": {{ "description": "A university logo", "url": "https://image.com/fdsafwe", }}, "homePageBackground": {{ "description": "The background image for the home page of a university website, shows the main building and a few students passing by", "url": "https://image.com/fdsafsdafweiof", }}, "campus1": {{ "description": "A picture of an university campus, showing the main building", "url": "https://image.com/fd3wlfewl", }}, "campus2": {{ "description": "A picture of an university campus, showing the academic building", "url": "https://image.com/l2wlfll", }}, "campus3": {{ "description": "A picture of an university campus, showing professors chattering", "url": "https://image.com/rlw3llwe", }} }}

	PAGE INFORMATION:
	title: Home
	route: /
	description: The home page for the university website, contains information of the campus, tuiton facilities and links to the other pages, followed by some photos of the campus, reviews of previous students and a contact us block

	NEXTJS COMPONENT:
	import images from '@/utils/images.json'
	// import everything used
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
						<Button sx={{{{marginTop: '20px'}}}} variant="contained">
							{{/* Do not use anchor tags, use Link instead */}}
							<Link href='/careers'>Explore careers</Link>
						</Button>
					</Box>
				</Box>

				<Box sx={{{{ backgroundColor: '#f0f0f0', padding: '50px' }}}}>
					<Typography variant="h4" component="h2" gutterBottom>
						Our Campus
					</Typography>
					<Box sx={{{{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}}}>
						<img src={{images.campus1.url}} alt={{images.campus1.description}} width="300" height="200" />
						<img src={{images.campus2.url}} alt={{images.campus1.description}} width="300" height="200" />
						<img src={{images.campus3.url}} alt={{images.campus1.description}} width="300" height="200" />
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
	images: {images}

	PAGE INFORMATION:
	title: {pageTitle}
	title: {pageRoute}
	description: {pageDescription}

	NEXTJS COMPONENT:

	`
})
