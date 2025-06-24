import { ButtonComponent } from "../button/button.component";
import "./certificate-error.component.css";

interface CertificateErrorComponentProps {
    message?: string;
    onClose: () => void;
}

export const CertificateErrorComponent: React.FC<CertificateErrorComponentProps> = ({
    message = 'Данный тип справки находится в работе, заказать новую нельзя',
    onClose,
}) => {
    return (
        <div className="certificate-error-overlay">
            <div className="certificate-error">
                <div className="certificate-error_content">
                    <img
                        className="certificate-error__icon"
                        src="/assets/svg/interface/blue/Warning.svg"
                    />
                    <p className="p1 certificate-error__message">{message}</p>
                </div>
                <ButtonComponent
                    onClick={onClose}>
                    Закрыть
                </ButtonComponent>

            </div>
        </div>
    );
};