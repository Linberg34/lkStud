import React, { useState } from "react";
import "./profile-education-data.component.css";

interface EducationItem {
    level: string;
    status: string;
    years: string;
    recordBook: string;
    studyForm: string;
    basis: string;
    faculty: string;
    direction: string;
    profile: string;
    course: string;
    group: string;
}

interface ProfileEducationDataProps {
    educationList: EducationItem[];
}

export const ProfileEducationDataComponent: React.FC<ProfileEducationDataProps> = ({
    educationList,
}) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

    const toggleOpen = (index: number) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const [activeTab, setActiveTab] = useState("education");

    return (
        <div className="profile-education-data-component">
            <div className="profile-education-data__tabs">
                <span 
                    className={activeTab === "education" ? "active" : ""} 
                    onClick={() => setActiveTab("education")}
                >
                    Образование
                </span>
                <span 
                    className={activeTab === "work" ? "active" : ""} 
                    onClick={() => setActiveTab("work")}
                >
                    Работа
                </span>
            </div>
            
            {activeTab === "education" && educationList.map((edu, index) => (
                <div key={index} className="education-block">
                    <div className="education-block__header" onClick={() => toggleOpen(index)}>
                        <div className="p1 education-block__level">{edu.level}</div>
                        <div className="p1 education-block__status">{edu.status}</div>
                        <div className={`education-block__arrow ${openIndexes.includes(index) ? "open" : ""}`}>
                            <img src="/assets/svg/Arrow/red/Chevron_Up.svg" alt="Toggle details" />
                        </div>
                    </div>
                    {openIndexes.includes(index) && (
                        <div className="education-block__content">
                            <div className="row">
                                <span>Года обучения</span>
                                <span>{edu.years}</span>
                            </div>
                            <div className="row">
                                <span>Номер зачетной книжки</span>
                                <span>{edu.recordBook}</span>
                            </div>
                            <div className="row">
                                <span>Форма обучения</span>
                                <span>{edu.studyForm}</span>
                            </div>
                            <div className="row">
                                <span>База</span>
                                <span>{edu.basis}</span>
                            </div>
                            <div className="row">
                                <span>Факультет</span>
                                <span>{edu.faculty}</span>
                            </div>
                            <div className="row">
                                <span>Направление</span>
                                <span>{edu.direction}</span>
                            </div>
                            <div className="row">
                                <span>Профиль</span>
                                <span>{edu.profile}</span>
                            </div>
                            <div className="row">
                                <span>Курс</span>
                                <span>{edu.course}</span>
                            </div>
                            <div className="row">
                                <span>Группа</span>
                                <span>{edu.group}</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            
            {activeTab === "work" && (
                <div className="work-content">
                    {/* Future work history content */}
                    <p>Информация о работе не доступна</p>
                </div>
            )}
        </div>
    );
};
