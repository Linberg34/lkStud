
import React, { useEffect, useState } from "react";
import { DetailedEventCard } from "../../../shared/ui/detailed-event-card/detailed-event-card.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import "./detailed-event.component.css";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import {
    EventDto,
    EventInnerRegisterDto,
    EventExternalRegisterDto,
} from "../../api/models/Events";
import {
    getPublicEventById,
    registerExternalParticipant,
    registerInnerParticipant,
    isParticipant,
} from "../../api/services/event-service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/checkAuth";
import { EventRegisterForm } from "../../../shared/ui/event-register-form/event-register-form.component";

//TODO: чекнуть работает ли запись на мероприятие, и отображение статуса записи(уже участвую)

export const DetailedEventPage: React.FC = () => {
    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    const [isOpen, setOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState<EventDto | null>(null);
    const [participating, setParticipating] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!id) return;
        const fetchEvent = async () => {
            try {
                const res = await getPublicEventById(id);
                setCardInfo(res);
                if (isAuthenticated) {
                    const resp = await isParticipant(id);
                    if (resp === 200) {
                        setParticipating(true);
                    }
                }
            } catch {
                setCardInfo(null);
            }
        };
        fetchEvent();
    }, [id, isAuthenticated]);

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    if (!cardInfo) {
        return <div>Загрузка...</div>;
    }

    const handleRegistration = () => {
        if (participating) return;
        if (isAuthenticated) {
            const dto: EventInnerRegisterDto = { eventId: id! };
            registerInnerParticipant(dto)
                .then(() => {
                    setParticipating(true);
                })
                .catch(() => { });
        } else {
            setOpen(true);
        }
    };

    const handleExternalSave = (data: {
        name: string;
        phone: string;
        email: string;
        additionalInfo: string;
    }) => {
        const dto: EventExternalRegisterDto = {
            eventId: id!,
            name: data.name,
            email: data.email,
            phone: data.phone,
            additionalInfo: data.additionalInfo,
        };
        registerExternalParticipant(dto)
            .then(() => {
                setParticipating(true);
                setOpen(false);
            })
            .catch((err: any) => {console.error(err.response.data) });
    };

    return (
        <div className="detailed-event__page">
            {isWide && isAuthenticated && <MenuComponent />}

            <div className="detailed-event__page-wrapper">
                <EventRegisterForm
                    eventId={id}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                    onSave={handleExternalSave}
                    name=""
                    phone=""
                    email=""
                    additionalInfo=""
                />

                <HeaderComponent title={"Мероприятия"} />
                <h1 className="detailed-event__page-title">Мероприятия</h1>
                <NavigationComponent username={cardInfo.title} />

                <div className="detailed-event_page-title">
                    <h2 className="detailed-event__title">{cardInfo.title}</h2>
                    {cardInfo.isRegistrationRequired && !participating && (
                        <ButtonComponent
                            onClick={handleRegistration}
                        >
                            Буду участвовать
                        </ButtonComponent>
                    )}
                    {participating &&
                        <ButtonComponent
                            type="outlined"
                        >
                            Участвую
                        </ButtonComponent>
                    }

                </div>

                <DetailedEventCard
                    title={cardInfo.title}
                    description={cardInfo.description || ""}
                    pictureId={cardInfo.picture?.id || ""}
                    latitude={cardInfo.latitude}
                    longitude={cardInfo.longitude}
                    dateTimeFrom={cardInfo.dateTimeFrom}
                    dateTimeTo={cardInfo.dateTimeTo}
                    format={cardInfo.format}
                    addressName={cardInfo.addressName}
                    registrationLastDate={cardInfo.registrationLastDate || ""}
                />
            </div>
        </div>
    );
};
