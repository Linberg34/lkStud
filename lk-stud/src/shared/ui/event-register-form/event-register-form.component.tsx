import  { useState, useEffect } from "react";
import "./event-register-form.component.css";
import { InputTextComponent } from "../input-text/input-text.component";
import { ButtonComponent } from "../button/button.component";
import { formatPhoneNumber } from "../../utils/phoneUtils";
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface EventRegisterFormProps {
    eventId?: string
    isOpen: boolean;
    onClose: () => void;
    name?: string;
    phone?: string;
    email?: string;
    additionalInfo?: string;
    onSave: (data: {
        eventId: string,
        name: string;
        phone: string;
        email: string;
        additionalInfo: string;
    }) => void;
}

export const EventRegisterForm: React.FC<EventRegisterFormProps> = ({
    eventId = "",
    isOpen,
    onClose,
    name: initialName = "",
    phone: initialPhone = "",
    email: initialEmail = "",
    additionalInfo: initialAdditionalInfo = "",
    onSave,
}) => {
    const t = usePageTranslations("events");
    const [name, setName] = useState<string>(initialName);
    const [phone, setPhone] = useState<string>(initialPhone);
    const [email, setEmail] = useState<string>(initialEmail);
    const [additionalInfo, setAdditionalInfo] = useState<string>(initialAdditionalInfo);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setPhone(formatted);
    };

    useEffect(() => {
        setName(initialName);
        setPhone(initialPhone);
        setEmail(initialEmail);
        setAdditionalInfo(initialAdditionalInfo);
    }, [initialName, initialPhone, initialEmail, initialAdditionalInfo]);

    if (!isOpen) {
        return null;
    }

    const handleSave = () => {
        onSave({
            eventId,
            name,
            phone,
            email,
            additionalInfo,
        });
    };

    return (
        <div className="event-register-form__overlay">
            <div className="event-register-form__modal">
                <img
                    className="event-register-form__close"
                    onClick={onClose}
                    src="/assets/svg/interface/black/Close_MD.svg"
                />
                <div className="event-register-form__header">
                    <h3 className="event-register-form__title">{t.register}</h3>
                </div>

                <div className="event-register-form__body">
                    <InputTextComponent
                        label={t.name}
                        value={name}
                        placeholder=""
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputTextComponent
                        label={t.phone}
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={handlePhoneChange}
                    />

                    <InputTextComponent
                        label={t.email}
                        value={email}
                        placeholder=""
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputTextComponent
                        label={t.additionalInfo}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder=""
                    />
                </div>

                <div className="event-register-form__footer">
                    <ButtonComponent onClick={handleSave}>{t.saveButton}</ButtonComponent>
                    <ButtonComponent onClick={onClose} type="outlined">
                        {t.cancelButton}
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
};
