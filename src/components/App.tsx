import StaticForm from "./StaticForm";
import { getData } from "../utils";

export default function App() {
	return (
		<StaticForm data={getData()} />
	);
}
