import React from "react";
import { format } from "date-fns";
import "./date-picker.component.css";
import { Calendar } from "../calendar/calendar";

type DatePickerProps = {
    label: string;
    value: string; 
    name?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
    caption?: string;
    isError?: boolean;
};

const componentClass = "date-picker-component";

export const DatePickerComponent: React.FC<DatePickerProps> = ({
    label,
    value,
    name,
    onChange,
    disabled = false,
    caption,
    isError = false,
}) => {
    const [isPicked, setIsPicked] = React.useState(false);
    const [showCalendar, setShowCalendar] = React.useState(false);

    const handleDateSelect = (date: Date) => {
        const iso = format(date, "yyyy-MM-dd");
        setIsPicked(true);
        onChange?.({ target: { name, value: iso } } as React.ChangeEvent<HTMLInputElement>);
        setShowCalendar(false);

    };

    const classNames = [
        componentClass,
        disabled && `${componentClass}_disabled`,
        isError && `${componentClass}_error`,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classNames} style={{ position: "relative" }}>
            <label className={`${componentClass}__label`}>
                <span className={`${componentClass}__title`}>{label}</span>
                <span className={`${componentClass}__field`}>
                    <input
                        className={`${componentClass}__input`}
                        type="text"
                        readOnly
                        name={name}
                        disabled={disabled}
                        value={value}
                        placeholder="дд.мм.гггг"
                        onClick={() => !disabled && setShowCalendar((v) => !v)}
                    />
                    <img
                        className={`${componentClass}__icon`}
                        src={
                            isPicked
                                ? "/assets/svg/interface/black/Date.svg"
                                : "/assets/svg/interface/black/Date_add.svg"
                        }
                        alt="calendar icon"
                        onClick={() => !disabled && setShowCalendar((v) => !v)}
                    />
                </span>
            </label>
            {caption && (
                <span className={`${componentClass}__caption`}>{caption}</span>
            )}
            {showCalendar && (
                <div className="calendar-wrapper">
                    <Calendar
                        selectedDate={value ? new Date(value) : new Date()}
                        onChange={handleDateSelect}
                        onCancel={() => setShowCalendar(false)}
                    />
                </div>
            )}
        </div>
    );
};
