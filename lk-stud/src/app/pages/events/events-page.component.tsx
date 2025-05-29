// import { EventCardComponent } from "../../../shared/ui/event-card/event-card.component";
import { useEffect, useState } from "react";
import "./events-page.component.css";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";

//TODO: подключить API. сделать компонент дейт пикера добавить компонент поиска пагинацию
export const EventsPageComponent = () => {
    const [isWide, setIsWide] = useState(window.innerWidth > 1200);

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="events-page-component">
            {isWide && <MenuComponent />}

            <div className="events-page-component__wrapper">
                <HeaderComponent title="Мероприятия" />
                <NavigationComponent />
                <div className="events-page-component__filters">

                </div>
                <div className="events-page-component__cards-container">
                    {/* <EventCardComponent
                title = "123"

            /> */}
                </div>
                {/* {meta && meta.pageCount > 1 && (
                    <div className="admin-useful-services__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                        />

                    </div>
                )} */}
            </div>

        </div>
    );
};