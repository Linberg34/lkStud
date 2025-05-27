import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ButtonComponent } from "../button/button.component";
import { InputTextComponent } from "../input-text/input-text.component";
import { SelectComponent } from "../input-text/select.component";
import { FileUploadComponent } from "../upload-file/upload-file.component";
import './useful-service-add-form.component.css';

interface UsefulServiceAddFormProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const initialFormData = {
    title: "",
    link: "",
    type: "",
    description: "",
    termsOfDistribution: "",
};

export const UsefulServiceAddForm: React.FC<UsefulServiceAddFormProps> = ({
    isOpen,
    onClose,
}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [file, setFile] = useState<File | null>(null);

    const handleClose = () => {
        setFormData(initialFormData);
        setFile(null);
        onClose?.();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("form", formData, "file", file);
        handleClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="useful-service-add-form"
            onClick={e => {
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <div
                className="useful-service-add-form__component"
                onClick={e => e.stopPropagation()}
            >
                <h3 className="useful-service-add-form__title">Добавление сервиса</h3>
                <div className="useful-service-add-form__body">
                    <InputTextComponent
                        label="Название сервиса"
                        name="title"
                        placeholder="Введите название сервиса"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <InputTextComponent
                        label="Ссылка"
                        name="link"
                        placeholder="Введите ссылку на сервис"
                        value={formData.link}
                        onChange={handleChange}
                    />
                    <SelectComponent
                        label="Тип"
                        name="type"
                        value={formData.type}
                        onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        options={[
                            { value: "ForAll", label: "Для всех" },
                            { value: "Employees", label: "Для сотрудников" },
                            { value: "Students", label: "Для студентов" },
                        ]}
                        placeholder="Выберите тип сервиса"
                    />
                    <InputTextComponent
                        label="Описание"
                        name="description"
                        placeholder="Введите описание сервиса"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <InputTextComponent
                        label="Условия предоставления"
                        name="termsOfDistribution"
                        placeholder="Введите условия предоставления сервиса"
                        value={formData.termsOfDistribution}
                        onChange={handleChange}
                    />
                    <FileUploadComponent
                        onFileSelect={setFile}
                        accept={["image/*"]}
                        label="Загрузить логотип"
                    />
                </div>
                <div className="useful-service-add-form__buttons">
                    <div className="useful-service-add-form__button-save">
                        <ButtonComponent onClick={handleSave}>
                            Сохранить
                        </ButtonComponent>
                    </div>
                    <div className="useful-service-add-form__button-cancel">
                        <ButtonComponent type="outlined" onClick={handleClose}>
                            Отменить
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
