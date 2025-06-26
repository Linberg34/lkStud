import React, { useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useFileBlob } from '../../hooks/fetchFile'
import { EventDto } from '../../../app/api/models/Events'
import './full-event-details-card.component.css'

interface FullEventDetailCardProps {
    event: EventDto
}

export const FullEventDetailsCard: React.FC<FullEventDetailCardProps> = ({ event }) => {
    const {
        title,
        description,
        picture,
        dateTimeFrom,
        dateTimeTo,
        format,
        type,
        auditory,
        isRegistrationRequired,
        registrationLastDate,
        addressName,
        latitude,
        longitude,
        isDigestNeeded,
        digestText,
        author
    } = event

    const { blobUrl: pictureUrl } = useFileBlob(picture?.id ?? '')
    const formatDate = (dt?: string) => dt ? new Date(dt).toLocaleString() : ''

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen((prev) => !prev);

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

    return (
        <div className="full-event-detail-card">
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

            <div className="full-event-detail-card__image">
                <img src={pictureUrl || '/assets/imgs/US-img.jpg'} />
            </div>


            <div className="detailed-event-card__row">
                <div className="detailed-event-card__column">
                    <span className="label">Необходима регистрация</span>
                    <span className="value">{isRegistrationRequired ? 'Да' : 'Нет'}</span>
                </div>
                {isRegistrationRequired && registrationLastDate && (
                    <div className="detailed-event-card__column">
                        <span className="label">Дата окончания регистрации</span>
                        <span className="value">{formatDate(registrationLastDate)}</span>
                    </div>
                )}
            </div>

            <div className="detailed-event-card__block">
                <div className="detailed-event-card__data">
                    <div className="admin-detailed-event-card__row">
                        <div className="admin-detailed-event-card__column">
                            <span className="label">Тип мероприятия</span>
                            <span className="value">{type}</span>
                        </div>
                        <div className="admin-detailed-event-card__column">
                            <span className="label">Целевая аудитория</span>
                            <span className="value">{auditory}</span>
                        </div>
                    </div>

                    <div className="admin-detailed-event-card__row">
                        <div className="admin-detailed-event-card__column">
                            <span className="label">Дата(ы) проведения</span>
                            <span className="value">
                                {formatDate(dateTimeFrom)}{dateTimeTo ? ` – ${formatDate(dateTimeTo)}` : ''}
                            </span>
                        </div>
                        <div className="admin-detailed-event-card__column">
                            <span className="label">Формат мероприятия</span>
                            <span className="value">{format}</span>
                        </div>
                    </div>
                    <div className="admin-detailed-event-card__row">
                        {format === 'Offline' && addressName && (
                            <div className="detailed-event-card__column">
                                <span className="label">Адрес проведения</span>
                                <span className="value">{addressName}</span>
                            </div>
                        )}
                    </div>
                    <div className="admin-detailed-event-card__row">
                        <div className="detailed-event-card__column">
                            <span className="label">Широта</span>
                            <span className="value">{latitude}</span>
                        </div>
                        <div className="detailed-event-card__column">
                            <span className="label">Долгота</span>
                            <span className="value">{longitude}</span>
                        </div>
                    </div>
                </div>
                <div className="detailed-event-card__block-map">
                    {format === 'Offline' && center && (
                        <div className="map-container">
                            {loadError && <div>Ошибка загрузки карты</div>}
                            {!isLoaded && <div>Загрузка карты…</div>}
                            {isLoaded && (
                                renderMap()
                            )}
                        </div>
                    )}
                </div>
            </div>
            {isDigestNeeded && (
                <div className="admin-detailed-event-card__row">

                    <div className="admin-detailed-event-card__column">
                        <span className="label">Текст дайджеста</span>
                        <div className="value">{digestText}</div>
                    </div>
                </div>

            )}

            {author && (
                <div className="admin-detailed-event-card__row">
                    <div className="admin-detailed-event-card__column">
                        <span className="label">Создал</span>
                        <span className="value">{author.firstName} {author.lastName}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

