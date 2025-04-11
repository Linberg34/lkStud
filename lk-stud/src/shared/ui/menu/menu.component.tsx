import React from "react";
import "./menu.components.css";
import { MenuItem } from "../menu-item/menu-item.component";

export const MenuComponent = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={`menu-component ${isOpen ? "open" : "closed"}`}>
            <div className="menu-component__avatar-wrapper">
                <img
                    src="/assets/imgs/login-poster.png  "
                    alt="avatar"
                    className="menu-component__avatar"
                />
            </div>
            <div
                className="menu-component__arrow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src="/assets/svg/Arrow/white/Chevron_Left_MD.svg"
                    alt="Toggle arrow"
                    className={isOpen ? "rotated" : ""}
                />
            </div>

            <div className="menu-component__menu">
                <MenuItem
                    text="Профиль"
                    srcBlack="/assets/svg/menu/black/User.svg"
                    srcBlue="/assets/svg/menu/blue/User.svg"
                    className="menu-component__profile"
                    isOpen={isOpen}
                />
                <MenuItem
                    text="Администрирование"
                    srcBlack="/assets/svg/menu/black/Administrator.svg"
                    srcBlue="/assets/svg/menu/blue/Administrator.svg"
                    className="menu-component__admin"
                    isOpen={isOpen}
                />
                <MenuItem
                    text="Справки"
                    srcBlack="/assets/svg/menu/black/Certificates.svg"
                    srcBlue="/assets/svg/menu/blue/Certificates.svg"
                    className="menu-component__certificates"
                    isOpen={isOpen}
                />
                <MenuItem
                    text="Полезные сервисы"
                    srcBlack="/assets/svg/menu/black/Links.svg"
                    srcBlue="/assets/svg/menu/blue/Links.svg"
                    className="menu-component__services"
                    isOpen={isOpen}
                />
                <MenuItem
                    text="Мероприятия"
                    srcBlack="/assets/svg/menu/black/Map.svg"
                    srcBlue="/assets/svg/menu/blue/Map.svg"
                    className="menu-component__events"
                    isOpen={isOpen}
                />
            </div>
        </div>
    );
};
