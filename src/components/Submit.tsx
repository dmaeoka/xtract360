import { Paper, Button, Grid, Typography, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import type { MyObject } from "../types";

export default function Submit() {
	const location = useLocation();
	const navigate = useNavigate();
	const savedObject = location.state as MyObject | null;

	return (
		<Container maxWidth="md">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Paper variant="elevation" sx={{ margin: 2, padding: 4 }}>
						{savedObject ? (
							<>
							<Typography variant="h5">Output</Typography>
								<pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#efefef", padding: 10, borderRadius: ".25rem", border: "1px solid #ccc" }}>{JSON.stringify(savedObject, null, 2)}</pre>
							</>
						) : (
							<Typography>No data received</Typography>
						)}
						<Button
							sx={{ marginTop: 2 }}
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
