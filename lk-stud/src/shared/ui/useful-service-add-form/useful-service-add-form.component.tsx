import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { InputTextComponent } from "../input-text/input-text.component";
import { SelectComponent } from "../input-text/select.component";
import { FileUploadComponent } from "../upload-file/upload-file.component";
import { ButtonComponent } from "../button/button.component";
import { UsefulServiceEditCreateDto } from "../../../app/api/models/useful-services";
import "./useful-service-add-form.component.css";
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface UsefulServiceAddFormProps {
    isOpen: boolean;
    onClose: () => void;
    mode: "add" | "edit";
    initialData: (UsefulServiceEditCreateDto & { id?: string }) | null;
    onSave: (data: UsefulServiceEditCreateDto) => void;
    t: ReturnType<typeof usePageTranslations>;
}

const blank: UsefulServiceEditCreateDto = {
    title: "",
    link: "",
    category: "ForAll",
    description: "",
    termsOfDisctribution: "",
    logoId: "",
};

export const UsefulServiceAddForm: React.FC<UsefulServiceAddFormProps> = ({
    isOpen,
    onClose,
    mode,
    initialData,
    onSave,
    t
}) => {
    const [formData, setFormData] = useState<UsefulServiceEditCreateDto>(blank);

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData(initialData);
        } else {
            setFormData(blank);
        }
    }, [isOpen, mode, initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="useful-service-add-form" onClick={onClose}>
            <div className="useful-service-add-form__component" onClick={(e) => e.stopPropagation()}>
                <h3 className="useful-service-add-form__title">
                    {mode === "add" ? "Добавить сервис" : "Редактировать сервис"}
                </h3>
                <div className="useful-service-add-form__body">
                    <InputTextComponent
                        label={t.nameOfService}
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={t.placeholderNoS}
                    />
                    <InputTextComponent
                        label={t.link}
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder={t.placeholderLink}
                    />
                    <SelectComponent
                        label={t.type}
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={[
                            { value: "ForAll", label: t.forAll },
                            { value: "Employees", label: t.employees },
                            { value: "Students", label: t.students },
                        ]}
                        placeholder={t.placeholder}
                    />
                    <InputTextComponent
                        label={t.description}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder={t.placeholderDesc}
                    />
                    <InputTextComponent
                        label={t.termsOfDisctribution}
                        name="termsOfDisctribution"
                        value={formData.termsOfDisctribution}
                        onChange={handleChange}
                        placeholder={t.placeholderTerms}
                    />
                    <FileUploadComponent
                        onFileSelect={(id) => setFormData((p) => ({ ...p, logoId: id || "" }))}
                        accept={["image/*"]}
                        t={t}
                    />
                </div>
                <div className="useful-service-add-form__buttons">
                    <div className="useful-service-add-form__button-save">
                        <ButtonComponent onClick={handleSubmit}>
                            {mode === "add" ? "Создать" : "Сохранить"}
                        </ButtonComponent>
                    </div>
                    <div className="useful-service-add-form__button-cancel">
                        <ButtonComponent type="outlined" onClick={onClose}>
                            Отменить
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};
