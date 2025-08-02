import {
	TextField,
	MenuItem,
	Grid,
	Typography,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";
import type { FieldConfig, DynamicFieldProps } from "../types";
import { isEmpty, isCurrencyObject } from "../utils";

export const DynamicField = ({
	field,
	value,
	onChange,
	showErrors = false
}: DynamicFieldProps) => {
	switch (field.type) {
		case "textInput":
			return (
				<TextField
					fullWidth
					label={field.label}
					value={value || ""}
					required={field.required}
					error={field.required && showErrors && isEmpty(value)}
					helperText={
						field.required && showErrors && isEmpty(value)
							? field.helperText || `${field.label} is required`
							: ""
					}
					onChange={(e) => onChange(e.target.value)}
				/>
			);

		case "integerInput":
			return (
				<TextField
					fullWidth
					type="number"
					label={field.label}
					value={value ?? ""}
					required={field.required}
					error={field.required && showErrors && isEmpty(value)}
					helperText={
						field.required && showErrors && isEmpty(value)
							? field.helperText || `${field.label} is required`
							: ""
					}
					onChange={(e) => onChange(Number(e.target.value))}
					inputProps={{ min: field.min ?? 0, max: field.max ?? Infinity }}
				/>
			);

		case "enumInput":
			return (
				<FormControl
					fullWidth
					required
					error={field.required && showErrors && isEmpty(value)}>
					<InputLabel>{field.label}</InputLabel>
					<Select
						label={field.label}
						value={value || ""}
						onChange={(e) => onChange(e.target.value)}
					>
						{field.values.map((option: string) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Select>
					{field.required && showErrors && isEmpty(value) && (
						<Typography variant="caption" color="error" sx={{ ml: 2 }}>
							{field.helperText || `${field.label} is required`}
						</Typography>
					)}
				</FormControl>
			);

		case "currencyInput": {
			const currencyVal = isCurrencyObject(value) ? value : { currency: field.currencies[0], value: 0 };

			return (
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<FormControl fullWidth required error={field.required && showErrors && isEmpty(currencyVal.currency)}>
							<InputLabel>{field.currencyLabel || "Currency"}</InputLabel>
							<Select
								label={field.currencyLabel || "Currency"}
								value={currencyVal.currency}
								onChange={(e) =>
									onChange({ ...currencyVal, currency: e.target.value })
								}
							>
								{field.currencies.map((c) => (
									<MenuItem key={c} value={c}>{c}</MenuItem>
								))}
							</Select>
							{field.required && showErrors && isEmpty(value) && (
								<Typography variant="caption" color="error" sx={{ ml: 2 }}>
									{field.helperText || `${field.label} is required`}
								</Typography>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							type="number"
							label={field.label}
							value={currencyVal.value ?? ""}
							required={field.required}
							error={field.required && showErrors && isEmpty(value) && Number(value) <= 0}
							helperText={
								field.required && showErrors && isEmpty(value) && Number(value) <= 0
									? field.helperText || `${field.label} is required`
									: ""
							}
							onChange={(e) =>
								onChange({
									...currencyVal,
									value: Number(e.target.value).toFixed(2),
								})
							}
							inputProps={{ min: field.min ?? 0, max: field.max ?? Infinity, step: 0.01 }}
						/>
					</Grid>
				</Grid>
			);
		}

		default:
			return (
				<Typography color="error">
					Unsupported field type: {(field as FieldConfig).type}
				</Typography>
			);

	}
};
