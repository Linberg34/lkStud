
import "../shared/styles/fonts.css";
import "../shared/styles/typography.css";
import { InternalServerErrPageComponent } from "./pages/errors/internal-server-err-page.component";
import { NotFoundPageComponent } from "./pages/errors/not-found-page.component";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePageComponent } from "./pages/profile/profile-page.component";
import { PageWrapperComponent } from "./pages/page-wrapper/page-wrapper.component";
import { UsefulServicesComponent } from "./pages/useful-services/useful-services.component";
import { AdminPageComponent } from "./pages/admin/admin-page.component";
import { UsersPageComponent } from "./pages/users/users-page.component";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPageComponent />} />
				<Route path="*" element={<NotFoundPageComponent />} />
				<Route path="/500" element={<InternalServerErrPageComponent />} />
				<Route path="/" element={<PageWrapperComponent />}>
					<Route path="profile/:id?" element={<ProfilePageComponent />} />
				</Route>
				<Route path="/usefulservices" element={<UsefulServicesComponent />} />
				<Route path="/admin" element={<AdminPageComponent />} />
				<Route path="/admin/users" element ={<UsersPageComponent/>} />
			</Routes>
		</BrowserRouter>
	);
};
