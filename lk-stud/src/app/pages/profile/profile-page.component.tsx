import { ProfileTabsComponent } from "../../../shared/ui/profile-tabs/profile-tabs.component";
import { ProfilePersonalDataComponent } from "../../../shared/ui/profile-personal-data/profile-personal-data.component";
import "./profile-page.component.css";

export const ProfilePageComponent = () => {

    const educationList = [
        {
            level: "Бакалавр",
            status: "Обучается",
            years: "2018 - 2022",
            recordBook: "123456",
            studyForm: "Очная",
            basis: "Бюджет",
            faculty: "Факультет информатики и вычислительной техники",
            direction: "Информатика и вычислительная техника",
            profile: "Программная инженерия",
            course: "4",
            group: "ИВТ-41",
        },
        {
            level: "Магистратура",
            status: "Обучается",
            years: "2022 - 2024",
            recordBook: "654321",
            studyForm: "Очно-заочная",
            basis: "Контракт",
            faculty: "Факультет инновационных технологий",
            direction: "Информационные системы и технологии",
            profile: "Управление IT-проектами",
            course: "1",
            group: "ИС-11М",
        },
    ];

    const workList = [
        {
            positionName: "Программист",
            rate: "1",
            employmentType: "Основное место работы",
            workPlace: "Управление цифровой среды",
            department: "Отдел разработки цифровых решений",
            positionType: "Учебно-вспомогательный персонал",
            direction: "Программная инженерия",
            startDate: "30.07.2022",
            endDate: "",
            totalExperience: "4 года 3 месяца",
            pedagogyExperience: "2 года 2 месяца",
            currentWorkExperience: "2 года 2 месяца"
        },
        {
            positionName: "Преподаватель",
            rate: "0.5",
            employmentType: "По совместительству",
            workPlace: "Управление цифровой среды",
            department: "Отдел разработки цифровых решений",
            positionType: "Учебно-вспомогательный персонал",
            direction: "Программная инженерия",
            startDate: "30.07.2022",
            endDate: "",
        },
    ];

    return (
        <div className="profile-page-component">
            <div className="profile-page-component__title-name">
                <h1 className="profile-page-component__title">Профиль</h1>
                <h2 className="profile-page-component__title-profile-name">Имя Фамилия Отчество</h2>
            </div>
            <div className="profile-page-component__all-content-wrapper">
                <ProfilePersonalDataComponent
                    imageSrc="/assets/imgs/login-poster.png"
                    personalData={[
                        { label: "Пол", value: "Мужской" },
                        { label: "Дата рождения", value: "01.01.1990" },
                        { label: "Гражданство", value: "Россия" },
                        { label: "СНИЛС", value: "123-456-789 00" },
                        { label: "Email", value: "ivanov@example.com" },
                    ]}
                    contacts={[
                        { label: "Телефон", value: "+7 999 123-45-67" },
                        { label: "Телефон 2", value: "+7 999 765-43-21" },
                        { label: "Дополнительный E-mail", value: "extra@mail.com" },
                        { label: "Адрес", value: "ул. Пушкина, д. Колотушкина" },
                    ]}
                />
                <div className="profile-page-component__main">
                    <h2 className="profile-page-component__name">Имя Фамилия Отчество</h2>
                    <ProfileTabsComponent
                        educationList={educationList}
                        workList={workList}
                    />
                </div>
            </div>
        </div>
    );
};
