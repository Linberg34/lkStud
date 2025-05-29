import { EventAuditory, EventFormat, EventStatus } from '../../../app/api/models/Events'
import './event-card.component.css'


interface EventCardComponentProps {
    title: string
    pictureUrl: string,
    isTimeFromNeeded: string,
    dateTimeFrom: string,
    isTimeToNeeded: string,
    dateTimeTo: string,
    format?: EventFormat,
    auditory?: EventAuditory,
    status?: EventStatus,
}
export const EventCardComponent: React.FC<EventCardComponentProps> = ({
    title,
    pictureUrl,
    isTimeFromNeeded,
    dateTimeFrom,
    isTimeToNeeded,
    dateTimeTo,
    format,
    auditory,
    status,
}) => {
    const formatDate = (dt?: string) =>
        dt ? new Date(dt).toLocaleString() : "";
    const statusClass = `event-card__status--${status}`;

    return (
        <div className="event-card__component">
            <h3 className="event-card__title">{title}</h3>
            <div className="event-card__img">
                <img
                    src={pictureUrl ?? "/assets/imgs/US-img.jpg"}
                />
            </div>
            {status &&
                <div className={`event-card__status ${statusClass}`}>
                    {status}
                </div>
            }
            <div className="event-card__text">
                <div className="event-card__text-body">
                    <div className="event-card__text-body-column">
                        <span className="p2 event-card__text-body-label">
                            Даты проведения
                        </span>
                        <span>
                            {isTimeFromNeeded && dateTimeFrom
                                ? formatDate(dateTimeFrom)
                                : ""}
                            {isTimeToNeeded && dateTimeTo
                                ? ` – ${formatDate(dateTimeTo)}`
                                : ""}
                        </span>
                    </div>
                    <div className="event-card__text-body-column">
                        <span className="p2 event-card__text-body-label">
                            Формат мероприятия
                        </span>
                        <span>{format}</span>
                    </div>
                    <div className="event-card__text-body-column">
                        <span className="p2 event-card__text-body-label">
                            Аудитория
                        </span>
                        <span>{auditory}</span>
                    </div>
                    <div className="event-card__text-body-column">
                        <span className="p2 event-card__text-body-label">
                            Статус
                        </span>
                        <span>{status}</span>
                    </div>
                </div>
            </div>
        </div>
    );

}