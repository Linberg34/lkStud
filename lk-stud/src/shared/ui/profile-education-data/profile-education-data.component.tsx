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
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="profile-education-data-component">
            {educationList.map((edu, index) => (
                <div key={index} className="education-block">
                    <div
                        className="education-block__header"
                        onClick={() => toggleOpen(index)}
                    >
                        <div className="p1 education-block__level">{edu.level}</div>
                        <div className="p1 education-block__status">{edu.status}</div>
                        <div
                            className={`education-block__arrow ${openIndexes.includes(index) ? "open" : ""
                                }`}
                        >
                            <img
                                src="/assets/svg/Arrow/red/Chevron_Up.svg"
                                alt="Toggle details"
                            />
                        </div>
                    </div>
                    {openIndexes.includes(index) && (
                        <div className="education-block__content">
                            <div className="row">
                                <div className="row__element">
                                    <span className="p2 row__element-label">Года обучения</span>
                                    <span className="p1 row__element-value">{edu.years}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">
                                        Номер зачетной книжки
                                    </span>
                                    <span className="p1 row__element-value">
                                        {edu.recordBook}
                                    </span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="row__element">
                                    <span className="p2 row__element-label">Форма обучения</span>
                                    <span className="p1 row__element-value">{edu.studyForm}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">База</span>
                                    <span className="p1 row__element-value">{edu.basis}</span>
                                </div>
                            </div>

                            <div className="row__element-single">
                                <span className="p2 row__element-label">Факультет</span>
                                <span className="p1 row__element-value">{edu.faculty}</span>
                            </div>

                            <div className="row__element-single">
                                <span className="p2 row__element-label">Направление</span>
                                <span className="p1 row__element-value">{edu.direction}</span>
                            </div>

                            <div className="row__element-single">
                                <span className="p2 row__element-label">Профиль</span>
                                <span className="p1 row__element-value">{edu.profile}</span>
                            </div>

                            <div className="row">
                                <div className="row__element">
                                    <span className="p2 row__element-label">Курс</span>
                                    <span className="p1 row__element-value">{edu.course}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">Группа</span>
                                    <span className="p1 row__element-value">{edu.group}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
