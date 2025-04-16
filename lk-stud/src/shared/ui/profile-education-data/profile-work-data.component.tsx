import React, { useState } from "react";
import "./profile-education-data.component.css";

interface WorkItem {
    positionName: string;
    rate: string;
    employmentType: string;
    workPlace: string;
    department: string;
    positionType: string;
    direction?: string;
    startDate: string;
    endDate: string;
    totalExperience?: string;
    pedagogyExperience?: string;
    currentWorkExperience?: string;
}

interface ProfileWorkDataProps {
    workList: WorkItem[];
}

export const ProfileWorkDataComponent: React.FC<ProfileWorkDataProps> = ({
    workList,
}) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleOpen = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    if (!workList || workList.length === 0) {
        return (
            <div className="work-content">
                <p>Информация о работе не доступна</p>
            </div>
        );
    }

    return (
        <div className="profile-education-data-component">
            {workList[0]?.totalExperience && (
                <div className="education-block">
                    <div
                        className="education-block__header"
                        onClick={() => toggleOpen(-1)} 
                    >
                        <div className="p1 education-block__level">Стаж</div>
                        <div
                            className={`education-block__arrow ${openIndexes.includes(-1) ? "open" : ""}`}
                        >
                            <img
                                src="/assets/svg/Arrow/red/Chevron_Up.svg"
                                alt="Toggle details"
                            />
                        </div>
                    </div>
                    {openIndexes.includes(-1) && (
                        <div className="education-block__content">
                            <div className="row">
                                <div className="row__element">
                                    <span className="p2 row__element-label">Общий стаж</span>
                                    <span className="p1 row__element-value">{workList[0].totalExperience}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">Педагогический стаж</span>
                                    <span className="p1 row__element-value">{workList[0].pedagogyExperience}</span>
                                </div>
                            </div>
                            {workList[0].currentWorkExperience && (
                                <div className="row__element-single">
                                    <span className="p2 row__element-label">Стаж на текущем месте работы</span>
                                    <span className="p1 row__element-value">{workList[0].currentWorkExperience}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {workList.map((work, index) => (
                <div key={index} className="education-block">
                    <div
                        className="education-block__header"
                        onClick={() => toggleOpen(index)}
                    >
                        <div className="p1 education-block__level">{work.positionName}</div>
                        <div className="p1 education-block__status"></div>
                        <div
                            className={`education-block__arrow ${openIndexes.includes(index) ? "open" : ""}`}
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
                                    <span className="p2 row__element-label">Вид занятости</span>
                                    <span className="p1 row__element-value">{work.employmentType}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">Ставка</span>
                                    <span className="p1 row__element-value">{work.rate}</span>
                                </div>
                            </div>
                            <div className="row__element-single">
                                <span className="p2 row__element-label">Место работы</span>
                                <span className="p1 row__element-value">{work.workPlace}</span>
                            </div>
                            <div className="row__element-single">
                                <span className="p2 row__element-label">Тип должности</span>
                                <span className="p1 row__element-value">{work.positionType}</span>
                            </div>
                            {work.direction && (
                                <div className="row__element-single">
                                    <span className="p2 row__element-label">Направление</span>
                                    <span className="p1 row__element-value">{work.direction}</span>
                                </div>
                            )}
                            <div className="row">
                                <div className="row__element">
                                    <span className="p2 row__element-label">Дата приема на работу</span>
                                    <span className="p1 row__element-value">{work.startDate}</span>
                                </div>
                                <div className="row__element">
                                    <span className="p2 row__element-label">Дата увольнения</span>
                                    <span className="p1 row__element-value">{work.endDate}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};