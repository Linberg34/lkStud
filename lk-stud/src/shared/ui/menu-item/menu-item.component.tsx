import { useState } from "react";

interface MenuItemProps {
    text: string;
    srcBlack: string;
    srcBlue: string;
    className?: string;
    isOpen: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    text,
    srcBlack,
    srcBlue,
    className = "",
    isOpen,
}) => {
    const [iconSrc, setIconSrc] = useState(srcBlack);

    return (
        <div
            className={`menu-item ${className}`}
            onMouseEnter={() => setIconSrc(srcBlue)}
            onMouseLeave={() => setIconSrc(srcBlack)}
        >
            <img src={iconSrc} alt={text} />
            {isOpen && <span className="menu-item__text">{text}</span>}
        </div>
    );
};
