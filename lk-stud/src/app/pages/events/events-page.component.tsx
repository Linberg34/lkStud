import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./events-page.component.css";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import { InputTextComponent } from "../../../shared/ui/input-text/input-text.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { DatePickerComponent } from "../../../shared/ui/date-picker/date-picker.component";
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations";
import { EventShortDtoPagedListWithMetaData } from "../../api/models/Events";
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component";
import { EventCardComponent } from "../../../shared/ui/event-card/event-card.component";
import { getPublicEvents } from "../../api/services/event-service";

export const EventsPageComponent: React.FC = () => {
    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    const [date, setDate] = useState<string>("");
    const [searchField, setSearchField] = useState<string>("");
    const t = usePageTranslations("events");
    const [items, setItems] = useState<EventShortDtoPagedListWithMetaData["results"]>([]);
    const [meta, setMeta] = useState<EventShortDtoPagedListWithMetaData["metaData"] | null>(null);
    const [page, setPage] = useState<number>(1);
    const pageSize = 6;
    const [hasQueryParams, setHasQueryParams] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const loadEvents = async (
        pageToLoad: number,
        name?: string,
        eventDateISO?: string
    ) => {
        const params = {
            page: pageToLoad,
            pageSize,
            name: name || undefined,
            eventDate: eventDateISO || undefined,
            timezoneOffset: new Date().getTimezoneOffset(),
        };
        try {
            const res = await getPublicEvents(params);
            setItems(res.results);
            setMeta(res.metaData);
        } catch {
            setItems([]);
            setMeta(null);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const nameQ = query.get("name") || undefined;
        const dateQ = query.get("eventDate") || undefined;
        if (nameQ || dateQ) {
            if (nameQ) setSearchField(nameQ);
            if (dateQ) setDate(dateQ);
            loadEvents(page, nameQ, dateQ ? `${dateQ}T00:00:00` : undefined);
            setHasQueryParams(true);
        } else {
            loadEvents(page);
            setHasQueryParams(false);
        }
    }, [page, location.search]);

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const makeISODate = (raw: string): string | undefined => {
        if (!raw) return undefined;
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
            return `${raw}T00:00:00`;
        }
        return undefined;
    };

    const handleSearch = () => {
        const isoDate = makeISODate(date);
        if (!searchField.trim() && !isoDate) {
            navigate("/events");
            setHasQueryParams(false);
            setPage(1);
            loadEvents(1);
            return;
        }
        const query = new URLSearchParams();
        if (searchField.trim()) {
            query.set("name", searchField.trim());
        }
        if (date) {
            query.set("eventDate", date);
        }
        query.set("page", "1");
        navigate({ pathname: "/events", search: query.toString() });
        setHasQueryParams(true);
        setPage(1);
        loadEvents(1, searchField.trim() || undefined, isoDate);
    };

    const handlePageChange = (newPage: number) => {
        const query = new URLSearchParams(location.search);
        query.set("page", newPage.toString());
        navigate({ pathname: "/events", search: query.toString() });
        setPage(newPage);
        const nameQ = query.get("name") || undefined;
        const dateQ = query.get("eventDate") || undefined;
        loadEvents(newPage, nameQ, dateQ ? `${dateQ}T00:00:00` : undefined);
    };

    return (
        <div className="events-page-component">
            {isWide && <MenuComponent />}
            <div className="events-page-component__wrapper">
                <HeaderComponent title={t.title} />
                <NavigationComponent />
                <div className="events-page-component__search-block">
                    <div className="events-page-component__find">
                        <InputTextComponent
                            label={t.nameOfEvent}
                            placeholder=""
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        <ButtonComponent onClick={handleSearch}>{t.search}</ButtonComponent>
                    </div>
                    <DatePickerComponent
                        label={t.date}
                        datePlaceholder={t.datePlaceholder}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="events-page-component__cards-container">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <EventCardComponent
                                key={item.id}
                                title={item.title}
                                isTimeFromNeeded={item.isTimeFromNeeded}
                                isTimeToNeeded={item.isTimeToNeeded}
                                dateTimeFrom={item.dateTimeFrom}
                                dateTimeTo={item.dateTimeTo}
                                format={item.format}
                                pictureId={item.picture?.id}
                                auditory={item.auditory}
                                status={hasQueryParams ? item.status : undefined}
                            />
                        ))
                    ) : (
                        <div className="events-page-component__no-results">
                            {t.noResultsFound}
                        </div>
                    )}
                </div>
                {meta && meta.pageCount > 1 && (
                    <div className="events-page-component__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
