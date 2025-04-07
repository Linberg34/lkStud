
import "../shared/styles/fonts.css";
import "../shared/styles/typography.css";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPageComponent />} />
			</Routes>
		</BrowserRouter>
	);
};
