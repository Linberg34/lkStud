import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navigation.component.css';

const NAVIGATION_NAME_MAP: Record<string, string> = {
    '/': 'Главная',
    '/profile': 'Профиль',
    '/admin': 'Администрирование',
    '/certificates': 'Справки',
    '/usefulservices': 'Полезные сервисы',
    '/events': 'Мероприятия',
};


export const NavigationComponent = () => {

    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter((x) => x);

    return (
        <nav className="navigation-component" aria-label="navigation">
            <div className="p2 navigation__home">
                {NAVIGATION_NAME_MAP['/']}
            </div>
            {pathnames.map((segment, index) => {
                const to = '/' + pathnames.slice(0, index + 1).join('/');
                const name = NAVIGATION_NAME_MAP[to] || segment;
                const isLast = index === pathnames.length - 1;

                return (
                    <React.Fragment key={to}>
                        <span className="p2 navigation__sep">/</span>
                        {isLast ? (
                            <span className="p2 navigation__current">
                                {name}
                            </span>
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
}