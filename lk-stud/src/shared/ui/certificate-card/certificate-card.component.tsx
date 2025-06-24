import React from "react";
import {
    CertificateReceiveType,
    CertificateStaffType,
    CertificateStatus,
    CertificateType,
} from "../../../app/api/models/certificates";
import "./certificate-card.component.css";

interface CertificateCardProps {
    date: string;
    certificateType: CertificateType | CertificateStaffType;
    certificateReceiveType: CertificateReceiveType;
    certificateStatus: CertificateStatus;
    onDownloadSignature?: () => void;
    onDownloadCertificate?: () => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
    date,
    certificateType,
    certificateReceiveType,
    certificateStatus,
    onDownloadSignature = () => { },
    onDownloadCertificate = () => { },
}) => {
    const formatDate = (dt?: string) =>
        dt ? new Date(dt).toLocaleString() : "";

    return (
        <div className="certificate-card">
            <div className="certificate-card__info_block">
                <span className="p1 certificate-card__date">
                    Справка от {formatDate(date)}
                </span>
                <span className="p2 certificate-card__type">
                    Тип справки: {certificateType}
                </span>
                <span className="p2 certificate-card__material">
                    Вид справки: {certificateReceiveType}
                </span>
            </div>

            {certificateStatus === "Finished" &&
                certificateReceiveType === "Electronic" && (
                    <div className="certificate-card__download">
                        <div
                            className="certificate-card__download-signature"
                            onClick={onDownloadSignature}
                        >
                            <img
                                className="certificate-card__download-icon"
                                src="/assets/svg/file/blue/Download_Package.svg"
                                alt="Подпись"
                            />
                            <span className="certificate-card__download-text">Подпись</span>
                        </div>

                        <div
                            className="certificate-card__download-certificate"
                            onClick={onDownloadCertificate}
                        >
                            <img
                                className="certificate-card__download-icon"
                                src="/assets/svg/file/white/Download_Package.svg"
                                alt="Справка"
                            />
                            <span>Справку</span>
                        </div>
                    </div>
                )}

            <div className={`certificate-card__status-${certificateStatus}`}>
                <h4 className="certificate-card__status-text">{certificateStatus}</h4>
            </div>
        </div>
    );
};
