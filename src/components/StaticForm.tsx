import React, { useState, useEffect } from "react";
import { Paper, Button, Grid, Typography, Container, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { MyObject, FieldConfig, FormValue } from "../types";
import { DynamicField } from "./DynamicField";
import config from "../data/configurationToImplement.json";
import { setDeep, getDeep, isEmpty, shouldDisplay } from "../utils";

interface StaticFormProps {
	data: MyObject;
}

const StaticForm = ({ data = { } }: StaticFormProps): JSX.Element => {

	const navigate = useNavigate();
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [myObject, setMyObject] = useState<MyObject>(data);

	const handleChange = (path: string, val: FormValue) => {
		setMyObject((prev) => setDeep({ ...prev }, path, val));
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setHasSubmitted(true);
		const missingRequired = config.filter(
			(field) => field.required && isEmpty(getDeep(myObject, field.path))
		);

		if (missingRequired.length > 0) {
			console.log("Missing required fields:", missingRequired.map(f => f.label || f.path));
			setAlertMessage("Please fill out all required fields before submitting.");
			return;
		}

		console.log("Form submitted with values:", myObject);

		navigate("/submitted", {
			state: myObject
		});
	};


	useEffect(() => {
		const withDefaults = config.reduce((acc, field) => {
			const currentVal = getDeep(acc, field.path);
			if (currentVal === undefined && field.defaultValue !== undefined) {
				return setDeep(acc, field.path, field.defaultValue);
			}
			return acc;
		}, { ...data });

		setMyObject(withDefaults);
	}, [data]);

	return (
		<Container maxWidth="md">
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
						<Paper variant="elevation" sx={{ margin: 2, padding: 4 }}>
							{alertMessage && (
								<Alert
									severity="error"
									variant="filled"
									sx={{ marginBottom: 2 }}
									onClose={() => setAlertMessage(null)}
								>{alertMessage}</Alert>
							)}
							<Typography variant="h4" sx={{ marginBottom: 2 }}>Driver Information</Typography>
							<Grid container spacing={2}>
								{(config as FieldConfig[]).map((field, idx) => {
									if (!shouldDisplay(myObject, field.displayIf)) return null;
									const currentValue = getDeep(myObject, field.path) ?? field.defaultValue;
									return (
										<Grid item xs={12} key={idx}>
											<DynamicField
												field={field}
												value={currentValue}
												onChange={(val: FormValue) => handleChange(field.path, val)}
												showErrors={hasSubmitted}
											/>
										</Grid>
									);
								})}
							</Grid>
							<Button
								sx={{ marginTop: 4 }}
								variant="outlined"
								type="submit">
								Submit
							</Button>
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default StaticForm;
