import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { fetchProfile } from '../../../store/slices/profileSlice'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { CreateEventFormComponent } from '../../../shared/ui/create-event-form/create-event-form.component'
import { EventCreateDto, EventDto } from '../../api/models/Events'
import { createEvent, editEvent, getFullEventDetails } from '../../api/services/event-service'
import './admin-create-event-page.component.css'

export const AdminCreateEventPageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>()
    const isEdit = Boolean(id)
    const [isWide, setIsWide] = useState(window.innerWidth > 1200)
    const [initialData, setInitialData] = useState<EventCreateDto | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (isEdit && id) {
            setLoading(true)
            getFullEventDetails(id)
                .then((dto: EventDto) => {
                    const {
                        title,
                        description,
                        digestText,
                        picture,
                        isTimeFromNeeded,
                        dateTimeFrom,
                        isTimeToNeeded,
                        dateTimeTo,
                        link,
                        addressName,
                        latitude,
                        longitude,
                        isRegistrationRequired,
                        registrationLastDate,
                        isDigestNeeded,
                        notificationText,
                        type,
                        format,
                        auditory,
                    } = dto
                    setInitialData({
                        title,
                        description,
                        digestText,
                        pictureId: picture?.id,
                        isTimeFromNeeded,
                        dateTimeFrom,
                        isTimeToNeeded,
                        dateTimeTo,
                        link,
                        addressName,
                        latitude,
                        longitude,
                        isRegistrationRequired,
                        registrationLastDate,
                        isDigestNeeded,
                        notificationText,
                        type,
                        format,
                        auditory,
                    })
                })
                .finally(() => setLoading(false))
        }
    }, [isEdit, id])

    const handleSave = async (data: EventCreateDto) => {
        const payload: Partial<EventCreateDto> = { ...data }
        Object.entries(payload).forEach(([key, val]) => {
            if (
                val === '' ||
                val === undefined ||
                (Array.isArray(val) && val.length === 0)
            ) {
                delete payload[key as keyof EventCreateDto]
            }
        })

        try {
            if (isEdit && id) {
                await editEvent({ id, ...payload } as EventDto)
            } else {
                await createEvent(payload as EventCreateDto)
            }
            navigate('/admin/events')
        } catch (err: any) {
            console.error('Ошибка при сохранении мероприятия:', err.response?.data || err)
            alert(err.response?.data?.title || 'Не удалось сохранить мероприятие')
        }
    }

    if (loading) return <p className="admin-create-event-page__loading">Загрузка...</p>

    return (
        <div className="admin-create-event-page">
            {isWide && <MenuComponent />}
            <div className="admin-event-page-component__wrapper">
                <HeaderComponent
                    title={isEdit ? 'Редактирование мероприятия' : 'Создание мероприятия'}
                />
                <NavigationComponent />
                <div className="admin-event-page-component__body">
                    <CreateEventFormComponent
                        mode={isEdit ? 'edit' : 'add'}
                        initialData={initialData}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    )
}
