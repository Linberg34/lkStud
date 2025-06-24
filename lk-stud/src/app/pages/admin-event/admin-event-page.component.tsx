import React, { useEffect, useState } from 'react'
import { AdminEventCard } from '../../../shared/ui/admin-event-card/admin-event-card.component'
import { getPublicEvents } from '../../api/services/event-service'
import {
    EventFormat,
    EventShortDtoPagedListWithMetaData,
    EventStatus,
    EventType,
} from '../../api/models/Events'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { InputTextComponent } from '../../../shared/ui/input-text/input-text.component'
import { DatePickerComponent } from '../../../shared/ui/date-picker/date-picker.component'
import { ButtonComponent } from '../../../shared/ui/button/button.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { usePageTranslations } from '../../../shared/hooks/usePageTranslations'
import './admin-event-page.component.css'
import { SelectComponent } from '../../../shared/ui/input-text/select.component'

export const AdminEventPageComponent: React.FC = () => {
    const t = usePageTranslations('events')
    const [isWide, setIsWide] = useState(window.innerWidth > 1200)
    const [showFilters, setShowFilters] = useState(false)
    const [events, setEvents] = useState<EventShortDtoPagedListWithMetaData['results']>([])
    const [meta, setMeta] = useState<EventShortDtoPagedListWithMetaData['metaData'] | null>(null)
    const [page, setPage] = useState(1)
    const [searchField, setSearchField] = useState('')
    const [status, setStatus] = useState<EventStatus | ''>('')
    const [type, setType] = useState<EventType | ''>('')
    const [format, setFormat] = useState<EventFormat | ''>('')
    const [date, setDate] = useState('')
    const pageSize = 5

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const loadEvents = async (pageToLoad = 1) => {
        const params = {
            page: pageToLoad,
            pageSize,
            name: searchField || undefined,
            status: status || undefined,
            type: type || undefined,
            format: format || undefined,
            eventDate: date || undefined,
            timezoneOffset: new Date().getTimezoneOffset(),
        }
        try {
            const res = await getPublicEvents(params)
            setEvents(res.results)
            setMeta(res.metaData)
        } catch {
            setEvents([])
            setMeta(null)
        }
    }

    useEffect(() => {
        loadEvents(page)
    }, [page])

    const handleSearch = () => {
        setPage(1)
        loadEvents(1)
    }

    const statusOptions = [
        { value: '', label: 'Все' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Actual', label: 'Actual' },
        { value: 'Finished', label: 'Finished' },
        { value: 'Archive', label: 'Archive' },
    ]
    const typeOptions = [
        { value: '', label: 'Все' },
        { value: 'Open', label: 'Open' },
        { value: 'Close', label: 'Close' },
    ]
    const formatOptions = [
        { value: '', label: 'Все' },
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
    ]

    return (
        <div className="admin-event-page-component">
            {isWide && <MenuComponent />}
            <div className="admin-event-page-component__wrapper">
                <HeaderComponent title="Администрирование" />
                <NavigationComponent />

                <h1 className="admin-event-page-component__page-title">Мероприятия</h1>

                <div className="admin-event-page-component__button">
                    <ButtonComponent
                        type="outlined"
                        iconSrc="/assets/svg/interface/red/Add.svg"
                        hoverIconSrc="/assets/svg/interface/white/Add.svg"
                        onClick={() => { }}
                    >
                        Добавить мероприятие
                    </ButtonComponent>
                </div>

                <div className="admin-event-page-component__search-block">
                    <div className="admin-event-page-component__search-block-header">
                        <h2 className="admin-event-page-component__search-block-title">Панель поиска</h2>
                        <ButtonComponent
                            type={showFilters ? 'outlined' : undefined}
                            iconSrc={
                                showFilters
                                    ? '/assets/svg/interface/blue/Switch.svg'
                                    : '/assets/svg/interface/white/Switch.svg'
                            }
                            iconPosition="end"
                            onClick={() => setShowFilters(f => !f)}
                        >
                            Фильтры
                        </ButtonComponent>
                    </div>

                    <div className="admin-event-page-component__search-block-function">
                        <InputTextComponent
                            label={t.nameOfEvent}
                            placeholder="Название мероприятия"
                            value={searchField}
                            onChange={e => setSearchField(e.target.value)}
                        />
                        <ButtonComponent onClick={handleSearch}>НАЙТИ</ButtonComponent>
                    </div>

                    {showFilters && (
                        <div className="admin-event-page-component__filters">
                            <SelectComponent
                                label="Статус"
                                name="status"
                                value={status}
                                onChange={e => setStatus(e.target.value as EventStatus)}
                                options={statusOptions}
                                placeholder="Выберите статус"
                                iconSrc="/assets/svg/Arrow/black/Caret_Down_MD.svg"
                            />
                            <SelectComponent
                                label="Тип мероприятия"
                                name="type"
                                value={type}
                                onChange={e => setType(e.target.value as EventType)}
                                options={typeOptions}
                                placeholder="Выберите тип"
                                iconSrc="/assets/svg/Arrow/black/Caret_Down_MD.svg"
                            />
                            <SelectComponent
                                label="Формат мероприятия"
                                name="format"
                                value={format}
                                onChange={e => setFormat(e.target.value as EventFormat)}
                                options={formatOptions}
                                placeholder="Выберите формат"
                                iconSrc="/assets/svg/Arrow/black/Caret_Down_MD.svg"
                            />
                            <DatePickerComponent
                                label="Дата проведения"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                datePlaceholder="дд.мм.гггг"
                            />
                        </div>
                    )}
                </div>

                <div className="admin-event-page__cards-container">
                    {events.map(ev => (
                        <AdminEventCard
                            key={ev.id}
                            id={ev.id}
                            title={ev.title}
                            pictureId={ev.picture?.id}
                            dateTimeFrom={ev.dateTimeFrom}
                            dateTimeTo={ev.dateTimeTo}
                            format={ev.format}
                            auditory={ev.auditory}
                            status={ev.status}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        />
                    ))}
                </div>

                {meta && meta.pageCount > 1 && (
                    <div className="admin-event-page-component__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={setPage}
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
