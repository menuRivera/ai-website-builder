'use client'
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<Box sx={{ textAlign: 'center' }}>
			<Box sx={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Box>
					<Typography variant="h2" component="h1" gutterBottom>
						University of Colorado
					</Typography>
					<Typography variant="body1" component="p">
						Empowering Minds, Igniting Potential
					</Typography>
					<Button sx={{marginTop: '20px'}} variant="contained"><Link href='/careers'>Explore careers</Link></Button>
				</Box>
			</Box>

			<Box sx={{ backgroundColor: '#f0f0f0', padding: '50px' }}>
				<Typography variant="h4" component="h2" gutterBottom>
					Our Campus
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
					<img src="campus1.png" alt="Campus 1" width="300" height="200" />
					<img src="campus2.png" alt="Campus 2" width="300" height="200" />
					<img src="campus3.png" alt="Campus 3" width="300" height="200" />
				</Box>
			</Box>

			<Box sx={{ marginTop: '100px' }}>
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

			<Box sx={{ marginTop: '100px' }}>
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
}
