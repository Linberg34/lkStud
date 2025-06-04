import "./certificate-order.component.css";
import { SelectComponent } from "../input-text/select.component";
import { ButtonComponent } from "../button/button.component";
import { CertificateReceiveType, CertificateType } from "../../../app/api/models/certificates";

interface CertificateOrderProps {
    onSave: () => void;
    certificateType: CertificateType,
    certificateReceiveType: CertificateReceiveType
}

export const CertificateOrder: React.FC<CertificateOrderProps> = ({
    onSave,
    certificateType,
    certificateReceiveType
}) => {
    ;

    return (
        <div className="certificate-order">
            <h3>Заказать справку</h3>
            <div className="certificate-order__content">
                <SelectComponent
                    iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"

                    label="Тип справки"
                    name="certificatesType"
                    value={certificateType}
                    onChange={() => { }}
                    options={[

                        { value: "ForPlaceWhereNeeded", label: "По месту предоставления" },
                        { value: "PensionForKazakhstan", label: "Казахстан" },
                    ]}
                    placeholder=""
                />
                <SelectComponent
                    iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"
                    label="Вид справки"
                    name="certificatesReceiveType"
                    value={certificateReceiveType}
                    onChange={() => { }}
                    options={[
                        { value: "Paper", label: "Бумажная" },
                        { value: "Electornic", label: "Электронная" },
                    ]}
                    placeholder=""
                />
                <ButtonComponent
                    onClick={onSave}
                >
                    Заказать
                </ButtonComponent>
            </div>
        </div>
    );
};

