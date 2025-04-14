import { LanguageToggleComponent } from "../../../shared/ui/language-toggle/language-toggle.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { ProfilePersonalDataComponent } from "../../../shared/ui/profile-personal-data/profile-personal-data.component";
import "./profile-page.component.css";

export const ProfilePageComponent = () => {
    return (
        <div className="profile-page-component">
            <MenuComponent />
            <div className="profile-page-component__wrapper">
                <div className="profile-page-component__header">
                    <h1>Профиль</h1>
                    <LanguageToggleComponent />
                </div>
                <div className="profile-page-component__content">
                    <ProfilePersonalDataComponent
                        imageSrc="/assets/imgs/login-poster.png"
                        gender="123"
                        birthDate="123"
                        citizenship="123"
                        snils="123"
                        email="123"
                        phoneNumbers={["12","21"]}
                        address="Ы"
                    />
                </div>
            </div>
        </div>

    )
};  