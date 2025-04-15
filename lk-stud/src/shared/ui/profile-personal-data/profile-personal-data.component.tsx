import React from "react";
import "./profile-personal-data.component.css";

// Определяем универсальный тип для элемента данных
export interface PersonalDataItem {
    label: string;
    value: string;
}

interface ProfilePersonalDataProps {
    imageSrc: string;
    // Массив с данными личных характеристик
    personalData: PersonalDataItem[];
    // Массив с контактной информацией
    contacts: PersonalDataItem[];
}

export const ProfilePersonalDataComponent: React.FC<ProfilePersonalDataProps> = ({
    imageSrc,
    personalData,
    contacts,
}) => {
    return (
        <div className="profile-personal-data-component">
            <div className="profile-personal-data-component__image">
                <img src={imageSrc} alt="Фото профиля" />
            </div>
            <div className="profile-personal-data-component__data-wrapper">
                <h3>Личные данные</h3>
                {personalData.map((item, index) => (
                    <div key={index} className="profile-personal-data-component__data">
                        <span className="p2 profile-personal-data-component__label">
                            {item.label}
                        </span>
                        <span className="p1 profile-personal-data-component__value">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
            <div className="profile-personal-data-component__contacts-wrapper">
                <h3>Контакты</h3>
                {contacts.map((item, index) => (
                    <div key={index} className="profile-personal-data-component__data">
                        <span className="p2 profile-personal-data-component__label">
                            {item.label}
                        </span>
                        <span className="p1 profile-personal-data-component__value">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
