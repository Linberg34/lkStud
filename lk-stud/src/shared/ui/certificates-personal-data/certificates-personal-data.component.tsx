import React from "react";
import "./certificates-personal-data.component.css";

export interface EducationItem {
    title: string;
    level: string;
    status: string;
    faculty: string;
    direction: string;
    group: string;
}

interface CertificatesPersonalDataProps {
    educationList: [EducationItem, EducationItem];
}

export const CertificatesPersonalData: React.FC<CertificatesPersonalDataProps> = ({
    educationList,
}) => {
    const [first, second] = educationList;

    return (
        <div className="certificates-personal-data">
            <div className="certificates-personal-data__tabs-header">
                <div className="certificates-personal-data__tab certificates-personal-data__tab--active">
                    <h3 className="certificates-personal-data__tab-title">{first.title}</h3>
                    <span className="certificates-personal-data__tab-text">
                        Уровень образования: {first.level}
                    </span>
                    <span className="certificates-personal-data__tab-text">
                        Статус: {first.status}
                    </span>
                    <div className="certificates-personal-data__tab-underline" />
                </div>
                <div className="certificates-personal-data__tab">
                    <h3 className="certificates-personal-data__tab-title">{second.title}</h3>
                    <span className="certificates-personal-data__tab-text">
                        Уровень образования: {second.level}
                    </span>
                    <span className="certificates-personal-data__tab-text">
                        Статус: {second.status}
                    </span>
                </div>
            </div>

            <div className="certificates-personal-data__content">
                <div className="certificates-personal-data__content-row">
                    <div className="certificates-personal-data__content-column">
                        <span className="p2 certificates-personal-data__column-label">
                            Уровень образования
                        </span>
                        <span className="p1 certificates-personal-data__column-text">
                            {first.level}
                        </span>
                    </div>
                    <div className="certificates-personal-data__content-column">
                        <span className="p2 certificates-personal-data__column-label">
                            Статус
                        </span>
                        <span className="p1 certificates-personal-data__column-text">
                            {first.status}
                        </span>
                    </div>
                </div>

                <div className="certificates-personal-data__content-row">
                    <div className="certificates-personal-data__content-column">
                        <span className="p2 certificates-personal-data__column-label">
                            Факультет
                        </span>
                        <span className="p1 certificates-personal-data__column-text">
                            {first.faculty}
                        </span>
                    </div>
                </div>

                <div className="certificates-personal-data__content-row">
                    <div className="certificates-personal-data__content-column">
                        <span className="p2 certificates-personal-data__column-label">
                            Направление
                        </span>
                        <span className="p1 certificates-personal-data__column-text">
                            {first.direction}
                        </span>
                    </div>

                    <div className="certificates-personal-data__content-column">
                        <span className="p2 certificates-personal-data__column-label">
                            Группа
                        </span>
                        <span className="p1 certificates-personal-data__column-text">
                            {first.group}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
