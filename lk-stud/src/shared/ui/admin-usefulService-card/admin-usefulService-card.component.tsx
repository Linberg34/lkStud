import { useState } from "react";
import "./admin-usefulService-card.component.css";
import { useFileBlob } from "../../hooks/fetchFile";
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface AdminUsefulServicesCardProps {
    title: string;
    description: string;
    link: string;
    termsOfDistribution: string;
    logoId: string;
    type: string;
    onEdit?: () => void;
    onDelete?: () => void;
    t: ReturnType<typeof usePageTranslations>;
}

export const AdminUsefulServicesCard: React.FC<AdminUsefulServicesCardProps> = ({
    title,
    description,
    link,
    termsOfDistribution,
    logoId,
    type,
    onEdit,
    onDelete,
    t
}) => {
    const { blobUrl: logoUrl, loading, error } = useFileBlob(logoId);
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <div className="admin-useful-service-card__component">
            <div className="admin-useful-service-card__card-logo">
                {!loading && !error && (
                    <img
                        src={logoUrl ?? "/assets/imgs/US-img.jpg"}
                        className="admin-useful-service-card__card-logo"
                    />
                )}
            </div>
            <div className="admin-useful-service-card__body">
                <h4 className="admin-useful-service-card__card-title">{title}</h4>
                <div className="admin-useful-service-card__card-body">
                    <div className="admin-useful-service-card__body-row ">
                        <div className="admin-useful-service-card__body-column">
                            <span className="admin-useful-service-card__label">{t.link}</span>
                            <a className="admin-useful-service-card__link"
                                href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                        </div>
                        <div className="admin-useful-service-card__body-column">
                            <span className="admin-useful-service-card__label">{t.type}</span>
                            <span>{type}</span>
                        </div>
                    </div>


                    <div className="admin-useful-service-card__body-terms">
                        {isOpen ? <img onClick={toggleOpen} src="/assets/svg/Arrow/black/Caret_Down_MD.svg" /> :
                            <img onClick={toggleOpen} src="/assets/svg/Arrow/black/Caret_Up_MD.svg" />}
                    </div>
                    {isOpen && (
                        <div className="admin-useful-service-card__card-description">
                            <div className="p1 admin-useful-service-card__body-row">
                                <div className="admin-useful-service-card__body-column">
                                    <span className="p2 admin-useful-service-card__label">{t.description}</span>
                                    <span>{description}</span>
                                </div>
                            </div>
                            <div className="p1 admin-useful-service-card__body-row">
                                <div className="admin-useful-service-card__body-column">
                                    <span className="p2 admin-useful-service-card__label">{t.termsOfDisctribution}</span>
                                    <span>{termsOfDistribution}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="admin-useful-service-card__card-actions">
                <img src="/assets/svg/interface/black/Edit.svg" className="icon" onClick={onEdit} />
                <img src="/assets/svg/interface/black//Trash_bin.svg" className="icon" onClick={onDelete} />
            </div>
        </div >
    );
};
