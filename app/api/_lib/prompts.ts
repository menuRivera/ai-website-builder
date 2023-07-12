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
	The images array must start with [ and end with ] (just like the example)

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

export const navbarPrompt = new PromptTemplate({
	inputVariables: ['userPrompt', 'routes', 'images'],
	template: `
	Create a nextjs navbar component using bootstrap, consider the following:
	- Use only bootstrap clasess to style the markup
	- The user must be able to navigate to every part of the website from the navbar
	- Make it responsive
	- Use the images provided at @/utils/images.json
	- Play with the colors to make it look professional
	- Don't explain the component

	WEBSITE INFORMATION:
	description: An university website
	routes: ["/", "/careers", "/tuition"]
	images: {{ "universityLogo": {{ "description": "A university logo", "url": "https://image.com/fdsafwe", }}, "homePageBackground": {{ "description": "The background image for the home page of a university website, shows the main building and a few students passing by", "url": "https://image.com/fdsafsdafweiof", }}, "campus1": {{ "description": "A picture of an university campus, showing the main building", "url": "https://image.com/fd3wlfewl", }}, "campus2": {{ "description": "A picture of an university campus, showing the academic building", "url": "https://image.com/l2wlfll", }}, "campus3": {{ "description": "A picture of an university campus, showing professors chattering", "url": "https://image.com/rlw3llwe", }} }}

	NEXTJS NAVBAR COMPONENT:
	import images from '@/utils/images.json'
	import Link from "next/link";
	import {{useRouter}} from "next/router";

	export default function Navbar() {{
		const router = useRouter()
		return (
			<>
				<nav className="navbar navbar-expand-lg bg-body-tertiary">
					<div className="container-fluid">
						<Link className="navbar-brand text-decoration-none" href="/">
							<img src={{images.universityLogo.url}} width="30" height="24" class="d-inline-block align-text-top"/>
								University of Colorado
						</Link>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className={{router.pathname == '/' ? 'nav-link text-decoration-none active' : 'nav-link text-decoration-none'}} href="/">Home</Link>
								</li>
								<li className="nav-item">
									<Link className={{router.pathname == '/careers' ? 'nav-link text-decoration-none active' : 'nav-link text-decoration-none'}} href="/careers">Careers</Link>
								</li>
								<li className="nav-item">
									<Link className={{router.pathname == '/tuition' ? 'nav-link text-decoration-none active' : 'nav-link text-decoration-none'}} href="/tuition">Tuition</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</>
		)
	}}

	WEBSITE INFORMATION:
	description: {userPrompt}
	routes: {routes}
	images: {images}

	NEXTJS NAVBAR COMPONENT: 

	`
})

export const footerPrompt = new PromptTemplate({
	inputVariables: ['userPrompt', 'routes'],
	template: `
	Create a nextjs footer component using bootstrap, consider the following:
	- Use only bootstrap clasess to style the markup
	- Play with the colors to make it look professional
	- Don't explain the component

	WEBSITE INFORMATION:
	description: An university website
	routes: ["/", "/careers", "/tuition"]

	NEXTJS NAVBAR COMPONENT:
	import Link from "next/link";

	export default function Footer() {{
		return (
			<>
				<footer className="footer bg-light py-5 mt-3">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<h4>About University</h4>
								<p>The University is dedicated to providing high-quality education and fostering academic excellence. We offer a wide range of programs and opportunities for students to thrive and succeed.</p>
							</div>
							<div className="col-md-3">
								<h4>Quick Links</h4>
								<ul className="list-unstyled">
									<li><Link href="/">Home</Link></li>
									<li><Link href="/careers">Careers</Link></li>
									<li><Link href="/tuition">Tuition</Link></li>
								</ul>
							</div>
							<div className="col-md-3">
								<h4>Contact Information</h4>
								<ul className="list-unstyled">
									<li><i className="fa fa-map-marker"></i> 123 University Street, City, Country</li>
									<li><i className="fa fa-phone"></i> +1 (123) 456-7890</li>
									<li><i className="fa fa-envelope"></i> info@university.edu</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<p className="text-center">© 2023 University. All rights reserved.</p>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</>
		)
	}}

	WEBSITE INFORMATION:
	description: {userPrompt}
	routes: {routes}

	NEXTJS FOOTER COMPONENT: 
	`
})

export const componentPrompt = new PromptTemplate({
	inputVariables: ['userPrompt', 'routes', 'pageTitle', 'pageRoute', 'pageDescription', 'images'],
	template: `
	For each page description provided, you must create a nextjs component considering the next context
	- It is a nexjs project using the pages routing system
	- Use only bootstrap clasess to style the markup
	- You can create links to any website route you consider necessary using the nextjs Link component and not the <a> tag
	- Use the images provided at @/utils/images.json
	- Play with the colors to make it look professional
	- Don't explain the component
	- Don't include a footer

	WEBSITE INFORMATION:
	description: An university website
	routes: ["/", "/careers", "/tuition"]
	images: {{ "universityLogo": {{ "description": "A university logo", "url": "https://image.com/fdsafwe", }}, "homePageBackground": {{ "description": "The background image for the home page of a university website, shows the main building and a few students passing by", "url": "https://image.com/fdsafsdafweiof", }}, "campus1": {{ "description": "A picture of an university campus, showing the main building", "url": "https://image.com/fd3wlfewl", }}, "campus2": {{ "description": "A picture of an university campus, showing the academic building", "url": "https://image.com/l2wlfll", }}, "campus3": {{ "description": "A picture of an university campus, showing professors chattering", "url": "https://image.com/rlw3llwe", }} }}

	PAGE INFORMATION:
	title: Home
	route: /
	description: The home page for the university website, contains information of the campus, tuiton facilities and links to the other pages, followed by some photos of the campus, reviews of previous students and a contact us block

	NEXTJS COMPONENT:
	import images from '@/utils/images.json'
	import Link from "next/link";

	export default function Home() {{
		return (
			<>
				<header className="bg-primary text-white py-5">
					<div className="container">
						<h1 className="display-4">Welcome to ABC University</h1>
						<p className="lead">Explore our campus and academic programs</p>
						<Link className="btn btn-light btn-lg" href="/careers">Get Started</Link>
					</div>
				</header>

				<section className="py-5">
					<div className="container">
						<h2 className="text-center mb-4">Our Campus</h2>
						<div className="row">
							<div className="col-lg-4 mb-4">
								<div className="card">
									<img src={{images.campus1.url}} className="card-img-top" alt={{images.campus1.description}} />
									<div className="card-body">
										<h5 className="card-title">Campus Facilities</h5>
										<p className="card-text">Discover our state-of-the-art facilities, including libraries, research centers, and sports complexes.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-4 mb-4">
								<div className="card">
									<img src={{images.campus2.url}} className="card-img-top" alt={{images.campus2.description}} />
									<div className="card-body">
										<h5 className="card-title">Campus Life</h5>
										<p className="card-text">Experience a vibrant campus life with a wide range of clubs, events, and student organizations.</p>
									</div>
								</div>
							</div>
							<div className="col-lg-4 mb-4">
								<div className="card">
									<img src={{images.campus3.url}} className="card-img-top" alt={{images.campus3.description}} />
									<div className="card-body">
										<h5 className="card-title">Campus Location</h5>
										<p className="card-text">Our campus is located in a beautiful and accessible area, surrounded by stunning natural scenery.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-light py-5">
					<div className="container">
						<h2 className="text-center mb-4">Tuition and Fees</h2>
						<p className="text-center">We offer affordable and competitive tuition fees for both in-state and out-of-state students. Financial aid and scholarships are available.</p>
						<div className="text-center">
							<Link className="btn btn-primary mt-4" href="/tuition">Learn More about Tuition</Link>
						</div>
					</div>
				</section>

				<section className="bg-light py-5">
					<div className="container">
						<h2 className="text-center mb-4">Student Reviews</h2>
						<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
							<div className="carousel-inner">
								<div className="carousel-item active">
									<blockquote className="blockquote text-center">
										<p className="mb-0">"My experience at ABC University has been exceptional. The professors are knowledgeable and supportive, and the campus offers a vibrant learning environment."</p>
										<footer className="blockquote-footer">John Doe, Computer Science</footer>
									</blockquote>
								</div>
								<div className="carousel-item">
									<blockquote className="blockquote text-center">
										<p className="mb-0">"I love the sense of community at ABC University. There are countless opportunities for personal and academic growth, and the campus facilities are top-notch."</p>
										<footer className="blockquote-footer">Jane Smith, Biology</footer>
									</blockquote>
								</div>
								<div className="carousel-item">
									<blockquote className="blockquote text-center">
										<p className="mb-0">"ABC University provides an inclusive and diverse learning environment. The faculty and staff are dedicated to helping students succeed in their academic and professional journeys."</p>
										<footer className="blockquote-footer">Mark Johnson, Psychology</footer>
									</blockquote>
								</div>
							</div>
							<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Previous</span>
							</button>
							<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Next</span>
							</button>
						</div>
					</div>
				</section>
			</>
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

export const stylesPrompt = new PromptTemplate({
	inputVariables: ['userPrompt'],
	template: `
	You are a flawless CSS generator designed to create the styles (css code) for a react component. The styles will always have the following characteristics:
      - All the website elements, sections, text boxes, containers, call to action and buttons will be round-edged rectangles and will use gradients. 
      - Sections will strictly meet the following structure: Thin round-edged rectangular shaped sections, extra sections, elements, Call to actions and buttons. 

	Decent separation between each section, element or button.
      - All buttons and sections will have hover effect with contrast.
      - All the divs or containers need to have horizontal and vertical separation margins. 
      - The main div or container will always have horizontal and vertical margins. You should use black or white background with neon gradients.
      - All added styles will strictly end with their corresponding semicolon (;)
      - Strictly avoid using equal signs (=) or any other character that is not accepted by CSS
      - Don't explain the code

	CSS CODE:

	`
})
