import { useState } from "react";
import "./detailed-event-card.component.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { EventFormat } from "../../../app/api/models/Events";
import { useFileBlob } from "../../hooks/fetchFile";

interface DetailedEventCardProps {
    title?: string;
    description?: string;
    pictureId?: string;
    latitude?: number;
    longitude?: number;
    dateTimeFrom?: string;
    dateTimeTo?: string;
    format: EventFormat;
    addressName?: string;
    registrationLastDate?: string;
}

export const DetailedEventCard: React.FC<DetailedEventCardProps> = ({
    title,
    description,
    pictureId,
    latitude,
    longitude,
    dateTimeFrom,
    dateTimeTo,
    format,
    addressName,
    registrationLastDate,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen((prev) => !prev);
    const formatDate = (dt?: string) =>
        dt ? new Date(dt).toLocaleString() : "";

    const { blobUrl: pictureUrl } = useFileBlob(pictureId ?? "");

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyC8IgWBdEuMHmBxrHRr6YyGk36AaHphmh4",
    });

    const center =
        latitude !== undefined && longitude !== undefined
            ? { lat: latitude, lng: longitude }
            : undefined;

    const mapOptions: google.maps.MapOptions = {
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
    };

    const renderMap = () => {
        if (!center) return null;
        if (loadError) {
            return <div>Ошибка загрузки карты</div>;
        }
        if (!isLoaded) {
            return <div>Загрузка карты...</div>;
        }
        return (
            <GoogleMap
                mapContainerStyle={{
                    width: "100%",
                    height: "200px",
                    maxHeight: "270px"
                }}
                center={center}
                zoom={16}
                options={mapOptions}
            >
                <Marker position={center} />
            </GoogleMap>
        );
    };

    const isOffline = format === "Offline";

    return (
        <div className="detailed-event-card">
            <div className="detailed-event-card__description-container">
                <div className="detailed-event-card__row" onClick={toggleOpen}>
                    <h4 className="detailed-event-card__title">{title}</h4>
                    <div
                        className={`detailed-event-card__arrow ${isOpen ? "open" : ""}`}
                    >
                        <img src="/assets/svg/Arrow/black/Chevron_Up.svg" alt="toggle" />
                    </div>
                </div>
                {isOpen && (
                    <div className="detailed-event-card__body">
                        <p className="p1 detailed-event-card__description">
                            {description}
                        </p>
                    </div>
                )}
            </div>

            <div className="detailed-event-card__image-block">
                <img
                    className="detailed-event-card__img"
                    src={pictureUrl ?? "/assets/imgs/US-img.jpg"}
                />
            </div>

            {registrationLastDate && <div className="detailed-event-card__row">
                <div className="detailed-event-card__column">
                    <div className="p2 detailed-event-card__body-label">
                        Дата окончания регистрации
                    </div>
                    <div className="p1 detailed-event-card__body-text">
                        {registrationLastDate && registrationLastDate
                            ? formatDate(registrationLastDate)
                            : ""}
                    </div>
                </div>
            </div>
            }

            <div className="detailed-event-card__row">
                <div className="detailed-event-card__column">
                    <div className="p2 detailed-event-card__text-label">
                        Дата(ы) проведения
                    </div>
                    <div className="p1 detailed-event-card__text">
                        {dateTimeFrom && dateTimeFrom
                            ? formatDate(dateTimeFrom)
                            : ""}
                        {dateTimeTo && dateTimeTo
                            ? ` – ${formatDate(dateTimeTo)}`
                            : ""}
                    </div>
                </div>
                <div className="detailed-event-card__column">
                    <div className="p2 detailed-event-card__text-label">
                        Формат мероприятия
                    </div>
                    <div className="p1 detailed-event-card__text">{format}</div>
                </div>
            </div>

            <div className="detailed-event-card__row">
                {addressName &&
                    <div className="detailed-event-card__column">
                        <div className="p2 detailed-event-card__text-label">Адрес</div>
                        <div className="p1 detailed-event-card__text">{addressName}</div>
                    </div>
                }

                {isOffline && (
                    <div className="detailed-event-card__column">
                        <div className="detailed-event-card__map">{renderMap()}</div>
                    </div>
                )}
            </div>
        </div>
    );
};
