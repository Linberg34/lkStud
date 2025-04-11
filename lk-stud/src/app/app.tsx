
import "../shared/styles/fonts.css";
import "../shared/styles/typography.css";
import { InternalServerErrPageComponent } from "./pages/errors/internal-server-err-page.component";
import { NotFoundPageComponent } from "./pages/errors/not-found-page.component";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPageComponent />} />
				<Route path="/404" element={<NotFoundPageComponent />} />
				<Route path="/500" element={<InternalServerErrPageComponent />} />
			</Routes>
		</BrowserRouter>
	);
};
