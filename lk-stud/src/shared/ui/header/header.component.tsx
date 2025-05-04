import React from "react";
import { useMediaQuery } from "@mui/material";
import { LanguageToggleComponent } from "../language-toggle/language-toggle.component";
import "./header.component.css";
import { MenuComponent } from "../menu/menu.component";

interface HeaderComponentProps {
    title: string;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ title }) => {
    const isMobile = useMediaQuery("(max-width: 1201px)");

    return (
        <div className="header-component">
            {isMobile ? (
                <>
                    <MenuComponent />
                    <LanguageToggleComponent />
                </>
            ) : (
                <>
                    <h1>{title}</h1> { }
                    <LanguageToggleComponent />
                </>
            )}
        </div>
    );
};