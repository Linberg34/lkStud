
import React, { useState } from 'react'
import { InputTextComponent } from '../input-text/input-text.component'
import { DatePickerComponent } from '../date-picker/date-picker.component'
import { SwitchComponent } from '../switch/switch.component'
import { SelectComponent } from '../input-text/select.component'
import { FileUploadComponent } from '../upload-file/upload-file.component'
import { ButtonComponent } from '../button/button.component'
import { TextEditor } from '../text-editor/text-editor.component'
import {
    EventCreateDto,
    EventFormat,
    EventType,
    EventAuditory,
} from '../../../app/api/models/Events'
import { usePageTranslations } from '../../hooks/usePageTranslations'
import './create-event-form.component.css'
import { useNavigate } from 'react-router-dom'

const blank: EventCreateDto = {
    title: '',
    description: '',
    digestText: '',
    pictureId: '',
    isTimeFromNeeded: false,
    dateTimeFrom: '',
    isTimeToNeeded: false,
    dateTimeTo: '',
    link: '',
    addressName: '',
    latitude: 0,
    longitude: 0,
    isRegistrationRequired: false,
    registrationLastDate: '',
    isDigestNeeded: false,
    notificationText: '',
    type: 'Open',
    format: 'Offline',
    auditory: 'All',
}

interface CreateEventFormProps {
    mode: 'add' | 'edit'
    initialData?: EventCreateDto
    onSave: (data: EventCreateDto) => void
}

export const CreateEventFormComponent: React.FC<CreateEventFormProps> = ({
    mode,
    onSave,
}) => {
    const t = usePageTranslations('events')
    const [formData, setFormData] = useState<EventCreateDto>(blank)
    const navigate = useNavigate();
    const handleChange = <K extends keyof EventCreateDto>(key: K, value: EventCreateDto[K]) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = () => {
        onSave(formData)
    }


    return (
        <div className="create-event-form__component" onClick={(e) => e.stopPropagation()}>
            <InputTextComponent
                label="Название мероприятия"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
            />

            <div className="create-event-form__section">
                <span className="create-event-form__label">Описание мероприятия</span>
                <TextEditor
                    value={formData.description || ''}
                    onChange={(html) => handleChange('description', html)}
                />
            </div>

            <div className="create-event-form__row">
                <div className="create-event-form__date-field">
                    <DatePickerComponent
                        label="Дата начала"
                        value={formData.dateTimeFrom || ''}
                        onChange={(e) => handleChange('dateTimeFrom', e.target.value)}
                        datePlaceholder="дд.MM.гггг"
                    />
                    <div className="create-event-form__date-field-column">
                        <p className="p1 create-event-form__label">Время </p>
                        <SwitchComponent
                            checked={formData.isTimeToNeeded}
                            onChange={(b) => handleChange('isTimeToNeeded', b)}
                        />
                    </div>
                </div>
                <div className="create-event-form__date-field">
                    <DatePickerComponent
                        label="Дата окончания"
                        value={formData.dateTimeTo || ''}
                        onChange={(e) => handleChange('dateTimeTo', e.target.value)}
                        datePlaceholder="дд.MM.гггг"
                        disabled={!formData.isTimeToNeeded}
                    />
                    <div className="create-event-form__date-field-column">
                        <p className="p1 create-event-form__label">Время </p>
                        <SwitchComponent
                            checked={formData.isTimeToNeeded}
                            onChange={(b) => handleChange('isTimeToNeeded', b)}
                        />
                    </div>
                </div>
            </div>

            <div className="create-event-form__row">
                <SelectComponent
                    label="Тип мероприятия"
                    name="type"
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value as EventType)}
                    options={[
                        { value: 'Open', label: 'Открытое' },
                        { value: 'Close', label: 'Закрытое' },
                    ]}
                    placeholder="Выберите тип"
                />

                <SelectComponent
                    label="Формат мероприятия"
                    name="format"
                    value={formData.format}
                    onChange={(e) => handleChange('format', e.target.value as EventFormat)}
                    options={[
                        { value: 'Offline', label: 'Офлайн' },
                        { value: 'Online', label: 'Онлайн' },
                    ]}
                    placeholder="Выберите формат"
                />
            </div>

            <InputTextComponent
                label="Ссылка"
                value={formData.link || ''}
                onChange={(e) => handleChange('link', e.target.value)}
            />

            <SelectComponent
                label="Аудитория"
                name="auditory"
                value={formData.auditory}
                onChange={(e) => handleChange('auditory', e.target.value as EventAuditory)}
                options={[
                    { value: 'All', label: 'Все' },
                    { value: 'Students', label: 'Студенты' },
                    { value: 'Employees', label: 'Преподаватели' },
                ]}
                placeholder="Выберите аудиторию"
            />

            <SwitchComponent
                checked={formData.isRegistrationRequired}
                onChange={(b) => handleChange('isRegistrationRequired', b)}
            />

            <DatePickerComponent
                label="Крайний срок регистрации"
                value={formData.registrationLastDate || ''}
                onChange={(e) => handleChange('registrationLastDate', e.target.value)}
                datePlaceholder="дд.MM.гггг"
                disabled={!formData.isRegistrationRequired}
            />

            <InputTextComponent
                label="Адрес"
                value={formData.addressName || ''}
                onChange={(e) => handleChange('addressName', e.target.value)}
                disabled={!formData.isRegistrationRequired}
            />

            <div className="create-event-form__coords">
                <InputTextComponent
                    label="Долгота"
                    value={String(formData.longitude || '')}
                    onChange={(e) => handleChange('longitude', Number(e.target.value))}
                    disabled={!formData.isRegistrationRequired}
                />
                <InputTextComponent
                    label="Широта"
                    value={String(formData.latitude || '')}
                    onChange={(e) => handleChange('latitude', Number(e.target.value))}
                    disabled={!formData.isRegistrationRequired}
                />
            </div>

            <SwitchComponent
                checked={formData.isDigestNeeded}
                onChange={(b) => handleChange('isDigestNeeded', b)}
            />

            <InputTextComponent
                label="Текст дайджеста"
                value={formData.digestText || ''}
                onChange={(e) => handleChange('digestText', e.target.value)}
                disabled={!formData.isDigestNeeded}
            />

            <div className="create-event-form__section">
                <span className="create-event-form__label">Уведомление о мероприятии</span>
                <TextEditor
                    value={formData.notificationText || ''}
                    onChange={(html) => handleChange('notificationText', html)}
                />
            </div>

            <FileUploadComponent
                onFileSelect={(id) => setFormData((p) => ({ ...p, logoId: id || "" }))}
                accept={['image/*']}
                t={t}
            />

            <div className="create-event-form__actions">
                <ButtonComponent onClick={handleSubmit}>
                    {mode === 'add' ? 'Создать' : 'Сохранить'}
                </ButtonComponent>
                <ButtonComponent type="outlined" onClick={() => navigate('/admin/events')}>
                    Отменить
                </ButtonComponent>
            </div>
        </div>
    )
}
