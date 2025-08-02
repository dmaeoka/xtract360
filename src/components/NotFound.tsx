import { Paper, Button, Grid, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<Container maxWidth="md">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Paper variant="elevation" sx={{ margin: 2, padding: 4 }}>
						<Typography>404 - Page Not Found</Typography>
						<Button
							sx={{ marginTop: 8 }}
							variant="outlined"
							onClick={() => navigate("/")}>
							Back
						</Button>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	)
}
