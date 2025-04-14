
import "../shared/styles/fonts.css";
import "../shared/styles/typography.css";
import { InternalServerErrPageComponent } from "./pages/errors/internal-server-err-page.component";
import { NotFoundPageComponent } from "./pages/errors/not-found-page.component";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePageComponent } from "./pages/profile/profile-page.component";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPageComponent />} />
				<Route path="*" element={<NotFoundPageComponent />} />
				<Route path="/500" element={<InternalServerErrPageComponent />} />
				<Route path="/profile" element={<ProfilePageComponent/>} />
			</Routes>
		</BrowserRouter>
	);
};
