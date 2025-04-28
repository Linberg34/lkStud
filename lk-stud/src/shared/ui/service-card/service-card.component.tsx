import React from "react"
import "./service-card.component.css"
import { ButtonComponent } from "../button/button.component"
import { useFileBlob } from "../../hooks/fetchFile"

interface ServiceCardProps {
    title: string
    description: string
    link: string
    termsOfDisсtribution: string
    logoId: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    link,
    termsOfDisсtribution,
    logoId,
}) => {
    const { blobUrl: logoUrl, loading, error } = useFileBlob(logoId)

    const handleClick = () => {
        window.open(link, "_blank", "noopener")
    }

    return (
        <div className="service-card-component">
            <div className="service-card-component__content">
                <div className="service-card-component__header">
                    <h4 className="service-card-component__title">{title}</h4>
                    <ButtonComponent
                        onClick={handleClick}
                        iconSrc="/assets/svg/Arrow/white/Arrow_Up_Right_MD.svg"
                        iconPosition="end"
                        type="primary"
                    >
                        Перейти на сайт
                    </ButtonComponent>
                </div>

                <div className="service-card-component__body">
                    <div className="service-card-component__body__img">
                        {loading && <div>Загрузка...</div>}
                        {error && <div>Не удалось загрузить логотип</div>}
                        {!loading && !error && (
                            <img
                                src={logoUrl ?? "/assets/imgs/US-img.jpg"}           
                                alt={title}                                          
                                className="service-card-component__body__img__img"
                                onError={(e) => {                                    
                                    e.currentTarget.onerror = null;                    
                                    e.currentTarget.src = "/assets/imgs/US-img.jpg";   
                                }}
                            />
                        )}
                    </div>


                    <div className="service-card-component__body__text__wrapper">
                        <div className="service-card-component__body__text">
                            {description}
                        </div>

                        <div className="service-card-component__body__subtext">
                            <p className="p2 service-card-component__body__subtext__title">
                                Условия предоставления
                            </p>
                            <div className="p1 service-card-component__body__subtext__content">
                                {termsOfDisсtribution}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
