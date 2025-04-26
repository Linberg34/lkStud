import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { Outlet } from "react-router-dom";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import "./page-wrapper.component.css";
import { useMediaQuery } from "@mui/material";
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations";

export const PageWrapperComponent = () => {
    const isLargeScreen = useMediaQuery('(min-width:1201px)');
        const t =usePageTranslations("profile")
    

    return (
        <div className="profile-page-wrapper">
            {isLargeScreen && <MenuComponent />}
            <div className="profile-page-wrapper__content">
                <HeaderComponent title={t.title}/>
                <div className="profile-page-component__wrapper">
                    <div className="profile-page-component__content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
