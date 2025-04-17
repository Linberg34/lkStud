import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../../store/store"
import { setLanguage } from "../../../store/slices/languageSlice"
import "./language-toggle.component.css"

export const LanguageToggleComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const selectedLanguage = useSelector((state: RootState) => state.language.selected)

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const toggleMenu = () => setIsOpen(open => !open)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLanguageSelect = (lang: "ru" | "en") => {
        dispatch(setLanguage(lang))
        setIsOpen(false)
    }

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
    )
}
