import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import "./menu.component.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { MenuItem } from "../menu-item/menu-item.component";
import { logout } from "../../../app/api/services/auth-service";
import { useNavigate } from "react-router-dom";
import { usePageTranslations } from "../../hooks/usePageTranslations";
import { fetchProfile } from "../../../store/slices/profileSlice";


export const MenuComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:1201px)");
    const menuRef = useRef<HTMLDivElement>(null);
    const profileId = useSelector((s: RootState) => s.profile.profile?.id);
    const avatarUrl = useSelector((s: RootState) => s.profile.avatarUrl);
    const t = usePageTranslations("menu");

    const handleLogout = () => {
        logout();
        navigate("/login");
    }



    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleAvatarClick = () => {
        setShowLogout(prev => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setShowLogout(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={menuRef}
            className={`menu-component ${isMobile ? "burger" : isOpen ? "open" : "closed"}`}
        >
            {isMobile ? (
                isOpen ? (
                    <>
                        <div
                            onClick={handleAvatarClick}
                            className="menu-component__avatar-wrapper">
                            <img
                                src={avatarUrl || ""}
                                className="menu-component__avatar"
                            />
                            {showLogout && (
                                <div className="menu-component__logout" onClick={handleLogout}>
                                    {!isMobile && <span>{t.logout}</span>}
                                    <img src="/assets/svg/interface/black/Log_Out.svg" />

                                </div>
                            )}

                        </div>
                        <div
                            className="menu-component__arrow"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <img
                                src="/assets/svg/Arrow/white/Chevron_Right_MD.svg"

                            />
                        </div>
                    </>
                ) : (
                    <div
                        className="menu-component__burger"
                        onClick={() => setIsOpen(true)}
                    >
                        <img
                            src="/assets/svg/menu/black/Hamburger.svg"

                        />


                    </div>
                )
            ) : (
                <>
                    <div
                        onClick={handleAvatarClick}
                        className="menu-component__avatar-wrapper">
                        <img
                            src={avatarUrl || ""}
                            className="menu-component__avatar"
                        />
                        {showLogout && (
                            <div className="menu-component__logout" onClick={handleLogout}>
                                {!isMobile && <span>{t.logout}</span>}
                                <img src="/assets/svg/interface/black/Log_Out.svg" />
                            </div>
                        )}
                    </div>
                    <div
                        className="menu-component__arrow"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img
                            src="/assets/svg/Arrow/white/Chevron_Left_MD.svg"
                            className={isOpen ? "rotated" : ""}
                        />
                    </div>
                </>
            )}

            {(!isMobile || isOpen) && (
                <div className="menu-component__menu">
                    <MenuItem
                        text={t.profile}
                        srcBlack="/assets/svg/menu/black/User.svg"
                        srcBlue="/assets/svg/menu/blue/User.svg"
                        className="menu-component__profile"
                        isOpen={isOpen}
                        link={profileId ? `/profile/${profileId}` : "/profile"}
                    />
                    <MenuItem
                        text={t.admin}
                        srcBlack="/assets/svg/menu/black/Administrator.svg"
                        srcBlue="/assets/svg/menu/blue/Administrator.svg"
                        className="menu-component__admin"
                        isOpen={isOpen}
                        link="/admin"
                    />
                    <MenuItem
                        text={t.certificate}
                        srcBlack="/assets/svg/menu/black/Certificates.svg"
                        srcBlue="/assets/svg/menu/blue/Certificates.svg"
                        className="menu-component__certificates"
                        isOpen={isOpen}
                        link="/certificates"
                    />
                    <MenuItem
                        text={t.services}
                        srcBlack="/assets/svg/menu/black/Links.svg"
                        srcBlue="/assets/svg/menu/blue/Links.svg"
                        className="menu-component__services"
                        isOpen={isOpen}
                        link="/usefulservices"
                    />
                    <MenuItem
                        text={t.events}
                        srcBlack="/assets/svg/menu/black/Map.svg"
                        srcBlue="/assets/svg/menu/blue/Map.svg"
                        className="menu-component__events"
                        isOpen={isOpen}
                        link="/events"
                    />
                </div>
            )}
        </div>
    );
};
