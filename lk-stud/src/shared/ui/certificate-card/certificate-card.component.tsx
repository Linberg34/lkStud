import './certificate-card.component.css'
interface CertificateCardProps {
    date: string
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
    date
}) => {
    return (
        <div className='certificate-card'>
            <div className="certificate-card__info_block">
                <span className='p1 certificate-card__date'>Справка от {date}</span>
                <span className='p2 certificate-card__type'>Тип справки: для </span>
                <span className='p2 certificate-card__material'>Вид справки: Бумажная</span>

            </div>
            <div className="certificate-card__status">
                <h4 className='certificate-card__status-text'>Заказано</h4>
            </div>
        </div>
    )
}