
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
import { AdminProfilePageComponent } from "./pages/admin-profile/admin-profile-page.component";
import { AdminUsefulServicesComponent } from "./pages/admin-useful-services/admin-usefulServices.component";
import { EventsPageComponent } from "./pages/events/events-page.component";
import { DetailedEventPage } from "./pages/detailed-event/detailed-event.component";
import { CertificatesPage } from "./pages/certificates/certificates-page.component";
import { AdminEventPageComponent } from "./pages/admin-event/admin-event-page.component";
import { AdminCreateEventPageComponent } from "./pages/admin-create-event-page/admin-create-event-page.component";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/events" element={<EventsPageComponent />} />
				<Route path="/events/:id" element={<DetailedEventPage />} />
				<Route path="/login" element={<LoginPageComponent />} />
				<Route path="*" element={<NotFoundPageComponent />} />
				<Route path="/500" element={<InternalServerErrPageComponent />} />
				<Route path="/" element={<PageWrapperComponent />}>
					<Route path="profile/:id?" element={<ProfilePageComponent />} />
				</Route>
				<Route path="/usefulservices" element={<UsefulServicesComponent />} />
				<Route path="/certificates" element={<CertificatesPage />} />
				<Route path="/admin" element={<AdminPageComponent />} />
				<Route path="/admin/users" element={<UsersPageComponent />} />
				<Route path="/admin/users/:id" element={<AdminProfilePageComponent />} />
				<Route path="/admin/usefulservices" element={<AdminUsefulServicesComponent />} />
				<Route path="/admin/events" element={<AdminEventPageComponent />} />
				<Route path="/admin/events/create" element={<AdminCreateEventPageComponent />} />


			</Routes>
		</BrowserRouter>
	);
};
