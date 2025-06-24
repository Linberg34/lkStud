import "./error-page.component.css";
import { ButtonComponent } from "../../../shared/ui/button/button.component";

export const NotFoundPageComponent = () => {
    const errorMessage = "Ошибка";
    const numberOfErrors = 10;

    return (
        <div className="error-page-component">
            <div className="error-page-component__content-wrapper">
                <div className="error-page-component__subtitle-title-wrapper">
                    <h1 className="error-page-component__title">404</h1>
                    <div className="error-page-component__subtitle">
                        <div className="error-page-component__not-found">
                            <h1>Page not found</h1>
                            <h1>Страница не найдена</h1>
                        </div>
                        <ButtonComponent>
                            ВЕРНУТЬСЯ НА ГЛАВНУЮ
                        </ButtonComponent>
                    </div>
                </div>
                <div className="error-page-component__description">
                    <h3>Что случилось?</h3>
                    <p>
                        Вероятно такой страницы не существует или вы ошиблись<br />
                        при вводе адреса в строку браузера
                    </p>
                </div>
            </div>
            <div className="error-line error-line--top">
                {Array.from({ length: numberOfErrors }).map((_, index) => (
                    <span key={index} className="error-line__item">{errorMessage}</span>
                ))}
            </div>
            <div className="error-line error-line--bottom">
                {Array.from({ length: numberOfErrors }).map((_, index) => (
                    <span key={index} className="error-line__item">{errorMessage}</span>
                ))}
            </div>
        </div>
    );
};