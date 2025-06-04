import { CertificatePersonalData } from '../../../shared/ui/cert-personal-data/certificate-personal-data.component'
import { CertificateCard } from '../../../shared/ui/certificate-card/certificate-card.component'
import { CertificatesOrder } from '../../../shared/ui/certificates-order/certificates-order.component'
import './certificates-page.component.css'



export const CertificatesPage: React.FC = () => {
    return (
        <div>
            <CertificatesOrder />
            <CertificatePersonalData/>
            <CertificateCard
                date="123"
            />
        </div>
    )
}