import { render, screen } from "@testing-library/react";
import { DynamicField } from "../components/DynamicField";
import type { FieldConfig } from "../types";

describe("DynamicField", () => {
	it("renders a text input", () => {
		const field: FieldConfig = {
			type: "textInput",
			label: "Name",
			path: "driver.name",
		};

		render(<DynamicField field={field} value="Alice" onChange={() => {}} showErrors={false} />);
		expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
	});

	it("renders an integer input", () => {
		const field: FieldConfig = {
			type: "integerInput",
			label: "Age",
			path: "driver.age",
			min: 0,
			max: 100,
		};

		render(<DynamicField field={field} value={30} onChange={() => {}} showErrors={false} />);
		expect(screen.getByLabelText("Age")).toBeInTheDocument();
		expect(screen.getByDisplayValue("30")).toBeInTheDocument();
	});

	it("renders an enum select", () => {
		const field: FieldConfig = {
			type: "enumInput",
			label: "Vehicle Type",
			path: "vehicle.type",
			values: ["Car", "Van", "Motorbike"],
		};

		render(<DynamicField field={field} value="Van" onChange={() => {}} showErrors={false} />);

		const select = screen.getByRole("combobox");
		expect(select).toBeInTheDocument();
		expect(select).toHaveTextContent("Van");

		const label = screen.getByText((content, element) => element?.tagName.toLowerCase() === "label" && content.startsWith("Vehicle Type"));
		expect(label).toBeInTheDocument();

	});

	it("renders a currency input", () => {
		const field: FieldConfig = {
			type: "currencyInput",
			label: "Trade Value",
			path: "vehicle.tradeValue",
			currencies: ["USD", "EUR"],
			min: 0,
			max: 100000,
		};

		const value = { currency: "USD", value: 5000 };

		render(<DynamicField field={field} value={value} onChange={() => {}} showErrors={false} />);
		expect(screen.getByLabelText(/Trade Value/i)).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toHaveTextContent("USD");
		expect(screen.getByDisplayValue("5000")).toBeInTheDocument();
	});
});
