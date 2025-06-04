import { CertificateReceiveType, CertificateStatus, CertificateType } from '../../../app/api/models/certificates'
import './certificate-card.component.css'
interface CertificateCardProps {
    date: string,
    certificateType: CertificateType,
    certificateReceiveType: CertificateReceiveType,
    certificateStatus: CertificateStatus,
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
    date,
    certificateType,
    certificateReceiveType,
    certificateStatus
}) => {
    return (
        <div className='certificate-card'>
            <div className="certificate-card__info_block">
                <span className='p1 certificate-card__date'>Справка от {date}</span>
                <span className='p2 certificate-card__type'>Тип справки: {certificateType} </span>
                <span className='p2 certificate-card__material'>Вид справки: {certificateReceiveType}</span>

            </div>
            <div className={`certificate-card__status-${certificateStatus}`}>
                <h4 className="certificate-card__status-text">{certificateStatus}</h4>
            </div>
        </div>
    )
}