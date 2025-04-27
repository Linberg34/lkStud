import React from "react"
import { UsefulServiceCategory } from "../../../app/api/models/useful-services/useful-service-category"
import { ButtonComponent } from "../button/button.component"
import { useAvatarUrl } from "../../hooks/useAvatar"  

interface ServiceCardProps {
    category: UsefulServiceCategory
    title: string
    description: string
    link: string
    termsOfDisсtribution: string     
    logoId: string
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    category,
    title,
    description,
    link,
    termsOfDisсtribution,
    logoId,
}) => {
    const { url: logoUrl } = useAvatarUrl(logoId)

    const handleClick = () => {
        window.open(link, "_blank", "noopener")
    }

    return (
        <div className="service-card-component">
            <div className="service-card-component__content">

                <div className="service-card-component__category">
                    {category}
                </div>

                <div className="service-card-component__header">
                    <h4 className="service-card-component__title">{title}</h4>
                    <ButtonComponent
                        onClick={handleClick}
                        iconSrc="/assets/svg/Arrow/white/Arrow_Up_Right_Md.svg"
                        iconPosition="end"
                        type="primary"
                    >
                        Перейти на сайт
                    </ButtonComponent>
                </div>

                <div className="service-card-component__body">
                    <div className="service-card-component__body__img">
                        <img
                            src={logoUrl}
                            alt="/assets/imgs/useful-services-img.svg"
                            className="service-card-component__body__img__img"
                        />
                    </div>

                    <div className="service-card-component__body__text__wrapper">
                        <div className="p1 service-card-component__body__text">
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
