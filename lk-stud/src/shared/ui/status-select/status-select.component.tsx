import React, { useState, useRef, useEffect } from 'react'
import './status-select.component.css'
import ChevronDownIcon from '/assets/svg/Arrow/black/Chevron_Down.svg'
import ChevronUpIcon from '/assets/svg/Arrow/black/Chevron_Down.svg'
import { EventStatus } from '../../../app/api/models/Events'

export type StatusOption = {
    value: EventStatus
    label: string
    color: 'active' | 'finished' | 'draft' | 'archive'
}

interface StatusSelectProps {
    value: EventStatus
    options: StatusOption[]
    onChange: (status: EventStatus) => void
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
    value,
    options,
    onChange,
}) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const selected = options.find((o) => o.value === value)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        window.addEventListener('mousedown', handler)
        return () => window.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="status-select" ref={ref}>
            <button
                type="button"
                className={`status-select__trigger status--${selected?.color}`}
                onClick={() => setOpen((v) => !v)}
            >
                {selected?.label}
                <img
                    src={open ? ChevronUpIcon : ChevronDownIcon}
                    className="status-select__icon"
                    alt=""
                />
            </button>
            {open && (
                <ul className="status-select__dropdown">
                    {options.map((opt) => (
                        <li key={opt.value}>
                            <button
                                type="button"
                                className={`status-select__option status--${opt.color}`}
                                onClick={() => {
                                    onChange(opt.value)
                                    setOpen(false)
                                }}
                            >
                                {opt.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
