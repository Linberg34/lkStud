import "./menu-item.components.css";
import { useState } from "react";
import { Link } from "react-router-dom";


interface MenuItemProps {
    text: string;
    srcBlack: string;
    srcBlue: string;
    className?: string;
    isOpen: boolean;
    link: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    text,
    srcBlack,
    srcBlue,
    className = "",
    isOpen,
    link,
}) => {
    const [iconSrc, setIconSrc] = useState(srcBlack);


    const content = (
        <div
            data-active={isOpen}
            className={`menu-item ${className}`}
            onMouseEnter={() => setIconSrc(srcBlue)}
            onMouseLeave={() => setIconSrc(srcBlack)}
        >
            <img src={iconSrc} alt={text} />
            {isOpen && <span className="menu-item__text">{text}</span>}
        </div>
    );
    return <Link className="menu-item__link" to={link}>{content}</Link>
};
