export interface Page { 
	title: string,
	route: string,
	description: string
}

export interface RequiredImage { 
	title: string,
	description: string
}

export interface Image extends RequiredImage {
	url: string
}
