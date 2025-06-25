import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { CreateEventFormComponent } from '../../../shared/ui/create-event-form/create-event-form.component'
import {
    EventCreateDto,
    EventDto,
} from '../../api/models/Events'
import {
    createEvent,
    editEvent,
    getFullEventDetails,
} from '../../api/services/event-service'
import './admin-create-event-page.component.css'
import { AppDispatch } from '../../../store/store'
import { useDispatch } from 'react-redux'
import { fetchProfile } from '../../../store/slices/profileSlice'

export const AdminCreateEventPageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>()
    const isEdit = Boolean(id)
    const [isWide, setIsWide] = useState(window.innerWidth > 1200)
    const [initialData, setInitialData] = useState<EventCreateDto | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (isEdit) {
            setLoading(true)
            getFullEventDetails(id!)
                .then((dto: EventDto) => {
                    const { id: _, ...rest } = dto
                    setInitialData(rest)
                })
                .finally(() => setLoading(false))
        }
    }, [id, isEdit])

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

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
            let result: EventDto
            if (isEdit) {
                result = await editEvent({ id: id!, ...payload } as EventDto)
            } else {
                result = await createEvent(payload as EventCreateDto)
            }
            navigate('/admin/events')
        } catch (err: any) {
            console.error('Ошибка при сохранении мероприятия:', err.response?.data || err)
            alert(err.response?.data?.title || 'Не удалось сохранить мероприятие')
        }
    }

    if (loading) { <p>Загрузка...</p> }

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
