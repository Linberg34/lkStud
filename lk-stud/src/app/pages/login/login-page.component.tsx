import React from "react";
import "./login-page.component.css";
import { InputTextComponent } from "../../../shared/ui/input-text/input-text.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { SwitchComponent } from "../../../shared/ui/switch/switch.component";
import { LanguageToggleComponent } from "../../../shared/ui/language-toggle/language-toggle.component";
import { login } from "../../api/services/auth-service";


export const LoginPageComponent = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isChecked, setIsChecked] = React.useState(false);
    
    const handleLogin = async () => {
        try {
            const result = await login({ email, password, rememberMe: isChecked });
            console.log("Успешный вход!", result);
        } catch (error) {
            console.error("Ошибка входа", error);
        }
    };


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
                    <h1>Вход в аккаунт</h1>
                    <form className="login-page-component__form">
                        <div className="login-page-component__fields">
                            <InputTextComponent
                                label={"Электронная почта"}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="example@mail.com"
                            />
                            <InputTextComponent
                                label={"Пароль"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="**********"
                            />
                        </div>
                        <div className="login-page-component__actions">
                            <div className="login-page-component__remember">
                                <SwitchComponent
                                    checked={isChecked}
                                    onChange={(checked => setIsChecked(checked))}
                                />
                                <span className="login-page-component__label">Запомнить меня</span>
                            </div>
                            <ButtonComponent onClick={handleLogin}>
                                Войти
                            </ButtonComponent>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}

