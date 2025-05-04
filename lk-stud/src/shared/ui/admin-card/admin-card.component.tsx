import React from 'react'
import { Link } from 'react-router-dom'
import './admin-card.component.css'

interface AdminCardComponentProps {
    iconSrc: string
    title: string
    description: string
    link: string
}

export const AdminCardComponent: React.FC<AdminCardComponentProps> = ({
    iconSrc,
    title,
    description,
    link,
}) => {
    const content = (
        <div className="admin-card-component__body">
            <div className="admin-card-component__header">
                <img
                    className="admin-card-component__icon"
                    src={iconSrc}
                    alt=""
                />
                <h2 className="admin-card-component__title">
                    {title}
                </h2>
            </div>
            <p className="p1 admin-card-component__description">
                {description}
            </p>
        </div>
    )

    return (
        <Link to={link} className="admin-card-component__link">
            {content}
        </Link>
    )
}