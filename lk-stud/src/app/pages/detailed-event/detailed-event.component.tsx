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
} from "../../api/services/event-service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/checkAuth";
import { EventRegisterForm } from "../../../shared/ui/event-register-form/event-register-form.component";

export const DetailedEventPage: React.FC = () => {
    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    const [isOpen, setOpen] = useState(false);
    const [cardInfo, setCardInfo] = useState<EventDto | null>(null);
    const { id } = useParams<{ id: string }>();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!id) return;
        const fetchEvent = async () => {
            try {
                const res = await getPublicEventById(id);
                setCardInfo(res);
            } catch {
                setCardInfo(null);
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    if (!cardInfo) {
        return <div>Загрузка...</div>;
    }

    const handleRegistration = () => {
        if (isAuthenticated) {
            const dto: EventInnerRegisterDto = { eventId: id! };
            registerInnerParticipant(dto)
                .then(() => {
                    alert("Вы успешно зарегистрировались как внутренний участник.");
                })
                .catch((err) => {
                    console.error(err);
                    alert("Не удалось зарегистрироваться.");
                });
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
                alert("Ваша заявка отправлена. Проверьте почту для подтверждения.");
                setOpen(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Не удалось отправить заявку.");
            });
    };

    return (
        <div className="detailed-event__page">
            {isWide && isAuthenticated && <MenuComponent />}

            <div className="detailed-event__page-wrapper">
                <EventRegisterForm
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
                    {cardInfo.isRegistrationRequired && (
                        <ButtonComponent onClick={handleRegistration}>
                            Буду участвовать
                        </ButtonComponent>
                    )}
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
