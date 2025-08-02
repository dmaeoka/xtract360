import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StaticForm from "../components/StaticForm";
import { getData } from "../utils";

describe("StaticForm", () => {

	it("submits correctly when all required fields are filled", async () => {
		render(
			<MemoryRouter>
				<StaticForm data={getData()} />
			</MemoryRouter>
		);

		fireEvent.change(screen.getByLabelText(/Driver Name/i), {
			target: { value: "John Doe" },
		});

		fireEvent.change(screen.getByLabelText(/Driver Age/i), {
			target: { value: "35" },
		});

		fireEvent.mouseDown(screen.getAllByRole("combobox")[0]);

		fireEvent.click(screen.getByText("Van"));

		fireEvent.mouseDown(screen.getAllByRole("combobox")[1]);

		fireEvent.click(screen.getByText("USD"));

		fireEvent.change(screen.getByLabelText(/Trade Value/i), {
			target: { value: "5000" },
		});

		fireEvent.click(screen.getByRole("button", { name: /submit/i }));

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();

	});
});
