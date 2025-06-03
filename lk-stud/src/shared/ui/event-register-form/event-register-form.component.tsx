import React, { useState, useEffect } from "react";
import "./event-register-form.component.css";
import { InputTextComponent } from "../input-text/input-text.component";
import { ButtonComponent } from "../button/button.component";
import { formatPhoneNumber } from "../../utils/phoneUtils";

interface EventRegisterFormProps {
    eventId?:string
    isOpen: boolean;
    onClose: () => void;
    name?: string;
    phone?: string;
    email?: string;
    additionalInfo?: string;
    onSave: (data: {
        eventId:string,
        name: string;
        phone: string;
        email: string;
        additionalInfo: string;
    }) => void;
}

export const EventRegisterForm: React.FC<EventRegisterFormProps> = ({
    eventId ="",
    isOpen,
    onClose,
    name: initialName = "",
    phone: initialPhone = "",
    email: initialEmail = "",
    additionalInfo: initialAdditionalInfo = "",
    onSave,
}) => {
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
                    alt="Закрыть"
                />
                <div className="event-register-form__header">
                    <h3 className="event-register-form__title">Регистрация на мероприятие</h3>
                </div>

                <div className="event-register-form__body">
                    <InputTextComponent
                        label="ФИО"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше ФИО"
                    />

                    <InputTextComponent
                        label="Телефон"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={handlePhoneChange}
                    />

                    <InputTextComponent
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите ваш email"
                    />

                    <InputTextComponent
                        label="Дополнительная информация"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder=""
                    />
                </div>

                <div className="event-register-form__footer">
                    <ButtonComponent onClick={handleSave}>Сохранить</ButtonComponent>
                    <ButtonComponent onClick={onClose} type="outlined">
                        Отменить
                    </ButtonComponent>
                </div>
            </div>
        </div>
    );
};
