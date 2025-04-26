
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../../../store/slices/authSlice"
import type { RootState, AppDispatch } from "../../../store/store"
import { InputTextComponent } from "../../../shared/ui/input-text/input-text.component"
import { ButtonComponent } from "../../../shared/ui/button/button.component"
import { SwitchComponent } from "../../../shared/ui/switch/switch.component"
import { LanguageToggleComponent } from "../../../shared/ui/language-toggle/language-toggle.component"
import "./login-page.component.css"
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations"

export const LoginPageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { status, error } = useSelector((s: RootState) => s.auth)

    const t = usePageTranslations("login");

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const handleLoginClick = () => {
        dispatch(login({ email, password, rememberMe }))
    }

    useEffect(() => {
        if (status === "succeeded") {
            navigate("/profile")
        }
    }, [status, navigate])


    
    return (
        <div className="login-page-component">
            <div className="login-page-component__header">
                <LanguageToggleComponent />
            </div>
            <div className="login-page-component__content">
                <img
                    className="login-page-component__poster"
                    src="/assets/imgs/login-poster.png"
                    
                />
                <div className="login-page-component__card">
                    <h1>{t.title}</h1>

                    {error && (
                        <div className="login-page-component__error">
                            {error}
                        </div>
                    )}

                    <div className="login-page-component__fields">
                        <InputTextComponent
                            label={t.emailLabel}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                        />
                        <InputTextComponent
                            label={t.passwordLabel}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="**********"
                        />
                    </div>

                    <div className="login-page-component__actions">
                        <div className="login-page-component__remember">
                            <SwitchComponent
                                checked={rememberMe}
                                onChange={setRememberMe}
                            />
                            <span className="login-page-component__label">
                                {t.rememberMe}
                            </span>
                        </div>
                        <ButtonComponent
                            onClick={handleLoginClick}
                            disabled={status === "loading"}
                        >
                            {t.loginButton}
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    )
}
