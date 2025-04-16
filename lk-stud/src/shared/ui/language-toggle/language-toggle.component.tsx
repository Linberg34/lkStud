import React, { useEffect, useRef } from "react";
import "./language-toggle.component.css";

interface LanguageToggleProps {
    onLanguageChange?: (language: "ru" | "en") => void;
}

export const LanguageToggleComponent: React.FC<LanguageToggleProps> = ({
    onLanguageChange,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState<"ru" | "en">("ru");
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);

        };
    }, []);

    const handleLanguageSelect = (language: "ru" | "en") => {
        setSelectedLanguage(language);
        setIsOpen(false);
        if (onLanguageChange) {
            onLanguageChange(language);
        }
    };

    return (
        <div ref={menuRef} className="language-toggle-component">
            <div className="language-toggle-component__current" onClick={toggleMenu}>
                <span className="language-toggle-component__name">
                    {selectedLanguage === "ru" ? "Русский" : "English"}
                </span>
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
                        onClick={() => handleLanguageSelect("en")}
                    >
                        <span className="language-toggle-component__label">English</span>
                        <img src="/assets/svg/language/en-language.svg" alt="English" />
                    </div>
                    <hr className="language-toggle-component__divider" />
                    <div
                        className="language-toggle-component__option"
                        onClick={() => handleLanguageSelect("ru")}
                    >
                        <span className="language-toggle-component__label">Русский</span>
                        <img src="/assets/svg/language/ru-language.svg" alt="Russian" />
                    </div>
                </div>
            )}
        </div>
    );
};