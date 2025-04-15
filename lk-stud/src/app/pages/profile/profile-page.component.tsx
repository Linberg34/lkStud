import { LanguageToggleComponent } from "../../../shared/ui/language-toggle/language-toggle.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { ProfileEducationDataComponent } from "../../../shared/ui/profile-education-data/profile-education-data.component";
import { ProfilePersonalDataComponent } from "../../../shared/ui/profile-personal-data/profile-personal-data.component";
import "./profile-page.component.css";


export const ProfilePageComponent = () => {
    const educationData = [
        {
            level: "Бакалавриат",
            status: "Выпускник",
            years: "2018-2022",
            recordBook: "3637484990",
            studyForm: "Очная",
            basis: "Бюджетная основа",
            faculty: "Институт космической техники",
            direction: "Программная инженерия",
            profile: "Программная инженерия",
            course: "1",
            group: "ТМ-11"
        },
        {
            level: "Магистратура",
            status: "Студент",
            years: "2022-2026",
            recordBook: "3636569903",
            studyForm: "Очная",
            basis: "Платная основа",
            faculty: "Институт космической техники",
            direction: "Программная инженерия",
            profile: "Программная инженерия",
            course: "1",
            group: "ТМ-21"
        }
    ];

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
                    <ProfileEducationDataComponent
                        educationList={educationData}
                    />
                </div>
            </div>
        </div>
    );
};