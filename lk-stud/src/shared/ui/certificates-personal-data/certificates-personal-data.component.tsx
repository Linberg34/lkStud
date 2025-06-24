import "./certificates-personal-data.component.css";

export interface ProfileItem {
    title: string;
    level: string;
    status: string;
    faculty?: string;
    direction?: string;
    group?: string;
    position?: string;
    department?: string;
    employmentType?: string;
    dateStart?: string;
    dateEnd?: string;
    rate?: number;
    postType?: string;
}

interface CertificatesPersonalDataProps {
    profileItems: ProfileItem[];
    activeIndex: number;
    onTabChange: (idx: number) => void;
}

export const CertificatesPersonalData: React.FC<CertificatesPersonalDataProps> = ({
    profileItems,
    activeIndex,
    onTabChange,
}) => {
    if (!profileItems || profileItems.length === 0) {
        return (
            <div className="certificates-personal-data">
                <div>Нет данных для отображения</div>
            </div>
        );
    }

    const safeActiveIndex = Math.max(0, Math.min(activeIndex, profileItems.length - 1));
    const activeProfile = profileItems[safeActiveIndex];

    if (!activeProfile) {
        return (
            <div className="certificates-personal-data">
                <div>Профиль не найден</div>
            </div>
        );
    }

    return (
        <div className="certificates-personal-data">
            <div className="certificates-personal-data__tabs-header">
                {profileItems.map((item, index) => {
                    const isActive = index === safeActiveIndex;

                    return (
                        <div
                            key={index}
                            className={`certificates-personal-data__tab ${isActive ? "certificates-personal-data__tab--active" : ""
                                }`}
                            onClick={() => onTabChange(index)}
                        >
                            {item?.position ? (
                                <>
                                    <h3 className="certificates-personal-data__tab-title">
                                        {item.position}
                                    </h3>

                                    {item.employmentType && (
                                        <span className="certificates-personal-data__tab-text">
                                            Тип занятости: {item.employmentType}
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h3 className="certificates-personal-data__tab-title">
                                        {item?.title || 'Без названия'}
                                    </h3>
                                    {item?.level && (
                                        <span className="certificates-personal-data__tab-text">
                                            Уровень: {item.level}
                                        </span>
                                    )}
                                    {item?.status && (
                                        <span className="certificates-personal-data__tab-text">
                                            Статус: {item.status}
                                        </span>
                                    )}
                                </>
                            )}

                            {isActive && (
                                <div className="certificates-personal-data__tab-underline" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="certificates-personal-data__content">
                {activeProfile.level && activeProfile.status && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Уровень
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.level}
                            </span>
                        </div>
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Статус
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.status}
                            </span>
                        </div>
                    </div>
                )}

                {activeProfile.faculty && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Факультет
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.faculty}
                            </span>
                        </div>
                    </div>
                )}

                {activeProfile.direction && activeProfile.group && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Направление
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.direction}
                            </span>
                        </div>
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Группа
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.group}
                            </span>
                        </div>
                    </div>
                )}

                {activeProfile.position && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Должность
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.position}
                            </span>
                        </div>
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Ставка
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.rate}
                            </span>
                        </div>
                    </div>
                )}

                {activeProfile.department && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Место работы
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.department}
                            </span>
                        </div>
                    </div>
                )}

                {activeProfile.employmentType && (
                    <div className="certificates-personal-data__content-row">
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Тип должности
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.postType || 'Не указано'}
                            </span>
                        </div>
                        <div className="certificates-personal-data__content-column">
                            <span className="p2 certificates-personal-data__column-label">
                                Тип занятости
                            </span>
                            <span className="p1 certificates-personal-data__column-text">
                                {activeProfile.employmentType}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};