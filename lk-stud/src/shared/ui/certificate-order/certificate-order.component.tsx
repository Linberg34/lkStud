import  { useState } from "react";
import "./certificate-order.component.css";
import { SelectComponent } from "../input-text/select.component";
import { ButtonComponent } from "../button/button.component";
import {
    CertificateReceiveType,
    CertificateStaffType,
    CertificateType,
} from "../../../app/api/models/certificates";
import { UserType } from "../../../app/api/models/profile";

interface CertificateOrderProps {
    onSave: (type: CertificateType | CertificateStaffType, receiveType: CertificateReceiveType) => void;
    certificateType?: CertificateType;
    certificateStaffType?: CertificateStaffType;
    certificateReceiveType?: CertificateReceiveType;
    role: UserType;
}

export const CertificateOrder: React.FC<CertificateOrderProps> = ({
    onSave,
    certificateType,
    certificateStaffType,
    certificateReceiveType = "Electronic",
    role,
}) => {
    const [studentType, setStudentType] = useState<CertificateType>(
        certificateType ?? "ForPlaceWhereNeeded"
    );
    const [employeeType, setEmployeeType] = useState<CertificateStaffType>(
        certificateStaffType ?? "ForPlaceOfWork"
    );
    const [receiveType, setReceiveType] = useState<CertificateReceiveType>(
        certificateReceiveType
    );

    return (
        <div className="certificate-order">
            <h3>Заказать справку</h3>
            <div className="certificate-order__content">
                {role === "Student" && (
                    <SelectComponent
                        iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"
                        label="Тип справки"
                        name="certificatesType"
                        value={studentType}
                        onChange={e => setStudentType(e.target.value as CertificateType)}
                        options={[
                            { value: "ForPlaceWhereNeeded", label: "По месту предоставления" },
                            { value: "PensionForKazakhstan", label: "Для военкомата в Казахстане" },
                        ]}
                        placeholder=""
                    />
                )}

                {role === "Employee" && (
                    <SelectComponent
                        iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"
                        label="Тип справки"
                        name="certificateStaffType"
                        value={employeeType}
                        onChange={e => setEmployeeType(e.target.value as CertificateStaffType)}
                        options={[
                            { value: "ForPlaceOfWork", label: "По месту работы" },
                            { value: "ForExperience", label: "По опыту" },
                            { value: "ForVisa", label: "Для визы" },
                            { value: "ForWorkBookCopy", label: "Копия трудовой книжки" },
                        ]}
                        placeholder=""
                    />
                )}

                <SelectComponent
                    iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"
                    label="Вид справки"
                    name="certificatesReceiveType"
                    value={receiveType}
                    onChange={e => setReceiveType(e.target.value as CertificateReceiveType)}
                    options={[
                        { value: "Paper", label: "Бумажная" },
                        { value: "Electronic", label: "Электронная" },
                    ]}
                    placeholder=""
                />

                <ButtonComponent
                    onClick={() => {
                        if (role === "Student") {
                            onSave(studentType, receiveType);
                        } else {
                            onSave(employeeType, receiveType);
                        }
                    }}
                >
                    Заказать
                </ButtonComponent>
            </div>
        </div>
    );
};
