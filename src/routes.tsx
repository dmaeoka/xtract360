import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./components/Base";
import App from "./components/App";
import Submit from "./components/Submit";
import NotFound from "./components/NotFound";

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Base />}>
					<Route index element={<App />}></Route>
					<Route path="submitted" element={<Submit />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes;
