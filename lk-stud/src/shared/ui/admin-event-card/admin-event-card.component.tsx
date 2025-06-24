import { useNavigate } from 'react-router-dom'
import { EventAuditory, EventFormat, EventStatus } from '../../../app/api/models/Events'
import { useFileBlob } from '../../hooks/fetchFile'
import './admin-event-card.component.css'

interface AdminEventCardProps {
    id: string
    title: string
    pictureId?: string
    dateTimeFrom?: string
    dateTimeTo?: string
    format?: EventFormat
    auditory?: EventAuditory
    status?: EventStatus
    onEdit?: () => void
    onDelete?: () => void
}

export const AdminEventCard: React.FC<AdminEventCardProps> = ({
    id,
    title,
    pictureId,
    dateTimeFrom,
    dateTimeTo,
    format,
    auditory,
    status,
    onDelete,
    onEdit
}) => {
    const navigate = useNavigate()
    const { blobUrl: pictureUrl } = useFileBlob(pictureId ?? '')
    const formatDate = (dt?: string) => (dt ? new Date(dt).toLocaleString() : '')

    return (
        <div className="admin-event-card" onClick={() => navigate(`/events/${id}`)}>
            <div className="admin-event-card__img">
                <img src={pictureUrl ?? '/assets/imgs/US-img.jpg'} alt="" />
            </div>
            <div className="admin-event-card__content">
                <div className="admin-event-card__header">
                    <h3 className="admin-event-card__title">{title}</h3>
                    <div className="admin-event-card__icons">
                        <img
                            src='/assets/svg/interface/black/Edit.svg'
                            onClick={onEdit}
                        />

                        <img
                            src='/assets/svg/interface/black/Trash_bin.svg'
                            onClick={onDelete}

                        />
                    </div>
                </div>
                {status && (
                    <span className={`admin-event-card__status status--${status}`}>
                        {status}
                    </span>
                )}
                <div className="admin-event-card__row">
                    <div className="admin-event-card__column">
                        <span className="label">Тип мероприятия</span>
                        <span className="value">{format || '-'}</span>
                    </div>

                    <div className="admin-event-card__column">
                        <span className="label">Формат мероприятия</span>
                        <span className="value">{format || '-'}</span>
                    </div>
                </div>

                <div className="admin-event-card__row">
                    <div className="admin-event-card__column">
                        <span className="label">Аудитория</span>
                        <span className="value">{auditory || '-'}</span>
                    </div>
                    <div className="admin-event-card__column">
                        <span className="label">Дата(ы) проведения</span>
                        <span className="value">
                            {dateTimeFrom ? formatDate(dateTimeFrom) : '-'}
                            {dateTimeTo ? ` – ${formatDate(dateTimeTo)}` : ''}
                        </span>
                    </div>
                </div>
                <div className="admin-event-card__row">

                    {dateTimeFrom && dateTimeTo && (
                        <>
                            <div className="admin-event-card__column">
                                <span className="label">Время начала</span>
                                <span className="value">{new Date(dateTimeFrom).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="admin-event-card__column">
                                <span className="label">Время окончания</span>
                                <span className="value">{new Date(dateTimeTo).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
