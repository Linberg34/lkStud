import React, { useState, useEffect } from "react"
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

    const [isMobile, setIsMobile] = useState(window.innerWidth < 601)
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 601)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const handleClick = () => {
        window.open(link, "_blank", "noopener")
    }

    const ImgBlock = (
        <div className="service-card-component__body__img">
            {loading && <div>Загрузка...</div>}
            {error && <div>Не удалось загрузить логотип</div>}
            {!loading && !error && (
                <img
                    src={logoUrl ?? "/assets/imgs/US-img.jpg"}
                    alt={title}
                    className="service-card-component__body__img__img"
                    onError={(e) => {
                        e.currentTarget.onerror = null
                        e.currentTarget.src = "/assets/imgs/US-img.jpg"
                    }}
                />
            )}
        </div>
    )

    const TextBlock = (
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
    )

    const ButtonBlock = (
        <ButtonComponent
            onClick={handleClick}
            iconSrc="/assets/svg/Arrow/white/Arrow_Up_Right_MD.svg"
            iconPosition="end"
            type="primary"
        >
            Перейти на сайт
        </ButtonComponent>
    )

    return (
        <div className="service-card-component">
            <div className="service-card-component__content">
                {isMobile ? (
                    <>
                        {ImgBlock}
                        <h4 className="service-card-component__title">{title}</h4>
                        {TextBlock}
                        {ButtonBlock}
                    </>
                ) : (
                    <>
                        <div className="service-card-component__header">
                            <h4 className="service-card-component__title">{title}</h4>
                            {ButtonBlock}
                        </div>
                        <div className="service-card-component__body">
                            {ImgBlock}
                            {TextBlock}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
