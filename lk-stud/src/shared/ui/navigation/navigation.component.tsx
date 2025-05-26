import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navigation.component.css';
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface NavigationComponentProps {
    username?: string;
}


export const NavigationComponent: React.FC<NavigationComponentProps> = ({
    username,
}) => {
    const t = usePageTranslations('navigation');
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter(x => x);

    const NAVIGATION_NAME_MAP: Record<string, string> = {
        '/': t.header,
        '/profile': t.profile,
        '/admin': t.admin,
        '/certificates': t.certificates,
        '/usefulservices': t.usefulservices,
        '/events': t.events,
        '/admin/users': t.users,
        '/admin/usefulservices': t.usefulservices,
    };

    return (
        <nav className="navigation-component" aria-label="navigation">
            <div className="p2 navigation__home">
                {NAVIGATION_NAME_MAP['/']}
            </div>
            {pathnames.map((segment, index) => {
                const to = '/' + pathnames.slice(0, index + 1).join('/');
                const isLast = index === pathnames.length - 1;

                const name =
                    isLast && username
                        ? username
                        : NAVIGATION_NAME_MAP[to] || segment;

                return (
                    <React.Fragment key={to}>
                        <span className="p2 navigation__sep">/</span>
                        {isLast ? (
                            <span className="p2 navigation__current">{name}</span>
                        ) : (
                            <Link to={to} className="p2 navigation__link">
                                {name}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};
