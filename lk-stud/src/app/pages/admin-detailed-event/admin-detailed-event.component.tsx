// src/features/admin/AdminDetailedEventComponent.tsx
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchProfile } from '../../../store/slices/profileSlice'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { useParams, useNavigate } from 'react-router-dom'
import { EventDto, EventStatus } from '../../api/models/Events'
import {
    getFullEventDetails,
    editEventStatus,
    deleteEvent
} from '../../api/services/event-service'
import { FullEventDetailsCard } from '../../../shared/ui/full-event-details-card/full-event-details-card.component'
import { StatusSelect, StatusOption } from '../../../shared/ui/status-select/status-select.component'
import './admin-detailed-event.component.css'

export const AdminDetailedEventComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [isWide, setIsWide] = useState(window.innerWidth > 1200)
    const [event, setEvent] = useState<EventDto | null>(null)
    const [status, setStatus] = useState<EventStatus>('Draft')

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (!id) return
        getFullEventDetails(id).then(e => {
            setEvent(e)
            setStatus(e.status)
        })
    }, [id])

    const options: StatusOption[] = [
        { value: 'Draft', label: 'Черновик', color: 'draft' },
        { value: 'Actual', label: 'Активное', color: 'active' },
        { value: 'Finished', label: 'Завершилось', color: 'finished' },
        { value: 'Archive', label: 'Архив', color: 'archive' },
    ]

    const handleStatusChange = async (newStatus: EventStatus) => {
        if (!id) return
        try {
            await editEventStatus(id)
            setStatus(newStatus)
        } catch {
            alert('Не удалось сменить статус')
        }
    }

    const handleDelete = async () => {
        if (!id || !window.confirm('Удалить мероприятие?')) return
        try {
            await deleteEvent(id)
            navigate('/admin/events')
        } catch {
            alert('Не удалось удалить')
        }
    }

    const handleEdit = () => {
        if (id) navigate(`/admin/events/${id}`)
    }

    if (!event) {
        return <div className="admin-detailed-event__loading">Загрузка...</div>
    }

    return (
        <div className="admin-detailed-event__page">
            {isWide && <MenuComponent />}
            <div className="admin-detailed-event__wrapper">
                <HeaderComponent title="Администрирование" />
                <NavigationComponent />

                <div className="admin-detailed-event__content">
                    <div className="admin-detailed-event__header">
                        <h2 className="admin-detailed-event__title">{event.title}</h2>
                        <div className="admin-detailed-event__header-actions">
                            <StatusSelect
                                value={status}
                                options={options}
                                onChange={handleStatusChange}
                            />
                            <img
                                src="/assets/svg/interface/black/Edit.svg"
                                onClick={handleEdit}
                                alt="Редактировать"
                            />
                            <img
                                src="/assets/svg/interface/black/Trash_bin.svg"
                                onClick={handleDelete}
                                alt="Удалить"
                            />
                        </div>
                    </div>

                    <FullEventDetailsCard event={event} />
                </div>
            </div>
        </div>
    )
}
