import { useNavigate } from 'react-router-dom'
import { EventAuditory, EventFormat, EventStatus } from '../../../app/api/models/Events'
import { useFileBlob } from '../../hooks/fetchFile'
import './event-card.component.css'


interface EventCardComponentProps {
    id:string,
    title: string
    pictureId?: string,
    isTimeFromNeeded: boolean,
    dateTimeFrom?: string,
    isTimeToNeeded: boolean,
    dateTimeTo?: string,
    format?: EventFormat,
    auditory?: EventAuditory,
    status?: EventStatus,
}
export const EventCardComponent: React.FC<EventCardComponentProps> = ({
    id,
    title,
    pictureId,
    isTimeFromNeeded,
    dateTimeFrom,
    isTimeToNeeded,
    dateTimeTo,
    format,
    status,
}) => {
    const navigate = useNavigate();
    const { blobUrl: pictureUrl, } = useFileBlob(pictureId ?? "");
    const formatDate = (dt?: string) =>
        dt ? new Date(dt).toLocaleString() : "";
    const statusClass = `event-card__status--${status}`;

    return (
        <div className="event-card__component"
            onClick={() => navigate(`/events/${id}`)}
        >
            <div className="event-card__img">
                <img
                    src={pictureUrl ?? "/assets/imgs/US-img.jpg"}
                />
            </div>
            <div className="event-card__content-wrapper">
                <div className="event-card__title-wrapper">
                    <h3 className="event-card__title">{title}</h3>
                </div>

                {status &&
                    <div className={`event-card__status ${statusClass}`}>
                        {status}
                    </div>
                }
                <div className="event-card__text">
                    <div className="event-card__text-body">
                        {(isTimeFromNeeded || isTimeToNeeded) &&
                            <div className="event-card__text-body-column">
                                <span className="p2 event-card__text-body-label">
                                    Дата(ы) проведения
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
                        }
                        <div className="event-card__text-body-column">
                            <span className="p2 event-card__text-body-label">
                                Формат мероприятия
                            </span>
                            <span>{format}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}