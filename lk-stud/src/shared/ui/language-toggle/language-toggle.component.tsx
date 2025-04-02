import React from "react";
import "./language-toggle.component.css";

interface LanguageToggleProps {
    onLanguageChange?: (language: "ru" | "en") => void;
}

export const LanguageToggleComponent: React.FC<LanguageToggleProps> = ({
    onLanguageChange,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState<"ru" | "en">("ru");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLanguageSelect = (language: "ru" | "en") => {
        setSelectedLanguage(language);
        setIsOpen(false);
        if (onLanguageChange) {
            onLanguageChange(language);
        }
    };

    return (
        <div className="language-toggle-component">
            <div className="language-toggle-component__current" onClick={toggleMenu}>
                <img
                    src={`/assets/svg/language/${selectedLanguage}-language.svg`}
                    alt={`${selectedLanguage} language`}
                />
                <div
                    className={`language-toggle-component__arrow ${isOpen ? "language-toggle-component__arrow--open" : ""
                        }`}
                >
                    <img src="/assets/svg/Arrow/black/Caret_Down_MD.svg" alt="Toggle arrow" />
                </div>
            </div>

            {isOpen && (
                <div className="language-toggle-component__menu">
                    <div
                        className="language-toggle-component__option"
                        onClick={() => handleLanguageSelect("ru")}
                    >
                        <span className="language-toggle-component__label">Русский</span>
                        <img src="/assets/svg/language/ru-language.svg" alt="Russian" />
                    </div>
                    <div
                        className="language-toggle-component__option"
                        onClick={() => handleLanguageSelect("en")}
                    >
                        <span className="language-toggle-component__label">English</span>
                        <img src="/assets/svg/language/en-language.svg" alt="English" />
                    </div>
                </div>
            )}
        </div>
    );
};