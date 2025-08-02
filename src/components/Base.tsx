import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import "../styles.css";

function Base() {
	return (
		<main className="App">
			<Typography variant="h3" component="h1" gutterBottom sx={{ paddingTop: 4, textAlign: "center" }}>Dynamic Form</Typography>
			<Outlet />
		</main>
	)
}

export default Base;
