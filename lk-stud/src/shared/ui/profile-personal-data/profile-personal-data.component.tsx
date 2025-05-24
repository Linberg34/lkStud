import React from "react";
import "./profile-personal-data.component.css";
import { usePageTranslations } from "../../hooks/usePageTranslations";

export interface PersonalDataItem {
    label: string;
    value: string;
}

interface ProfilePersonalDataProps {
    imageSrc: string;
    personalData: PersonalDataItem[];
    contacts: PersonalDataItem[];
    onAvatarClick?: () => void;
}

export const ProfilePersonalDataComponent: React.FC<ProfilePersonalDataProps> = ({
    imageSrc,
    personalData,
    contacts,
    onAvatarClick,
}) => {
    const t = usePageTranslations("profile")

    return (
        <div className="profile-personal-data-component">
            <div className="profile-personal-data-component__image">
                <img
                    src={imageSrc}
                    onClick={onAvatarClick}
                    style={{ cursor: onAvatarClick ? "pointer" : undefined }}
                />
            </div>
            <div className="profile-personal-data-component__info-wrapper">
                <div className="profile-personal-data-component__data-wrapper">
                    <h3>{t.personalData}</h3>
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
                    <h3>{t.contacts}</h3>
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
        </div>
    );
};
