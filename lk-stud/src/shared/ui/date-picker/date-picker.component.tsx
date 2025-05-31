import React, { useRef, useEffect, useState } from "react";
import { format, parse, isValid, parseISO } from "date-fns";
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
    const [isPicked, setIsPicked] = useState<boolean>(!!value);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const [inputValue, setInputValue] = useState<string>(
        value ? format(parseISO(value), "dd.MM.yyyy") : ""
    );
    const lastValidRef = useRef<string>(value || "");

    useEffect(() => {
        if (value) {
            lastValidRef.current = value;
            setInputValue(format(parseISO(value), "dd.MM.yyyy"));
            setIsPicked(true);
        } else {
            lastValidRef.current = "";
            setInputValue("");
            setIsPicked(false);
        }
    }, [value]);

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                showCalendar &&
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        if (inputValue.trim() === "") {
            lastValidRef.current = "";
            setIsPicked(false);
            onChange?.({
                target: { name, value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            setInputValue("");
            return;
        }

        const parsed = parse(inputValue, "dd.mm.yyyy", new Date());
        if (isValid(parsed)) {
            const iso = format(parsed, "yyyy-MM-dd");
            lastValidRef.current = iso;
            setIsPicked(true);
            onChange?.({
                target: { name, value: iso },
            } as React.ChangeEvent<HTMLInputElement>);
            setInputValue(format(parsed, "dd.MM.yyyy"));
        } else {
            if (lastValidRef.current) {
                setInputValue(format(parseISO(lastValidRef.current), "dd.MM.yyyy"));
            } else {
                setInputValue("");
                setIsPicked(false);
            }
        }
    };

    const handleDateSelect = (date: Date) => {
        const iso = format(date, "yyyy-MM-dd");
        lastValidRef.current = iso;
        setIsPicked(true);
        onChange?.({
            target: { name, value: iso },
        } as React.ChangeEvent<HTMLInputElement>);
        setInputValue(format(date, "dd.MM.yyyy"));
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
        <div
            className={classNames}
            style={{ position: "relative" }}
            ref={containerRef}
        >
            <label className={`${componentClass}__label`}>
                <span className={`${componentClass}__title`}>{label}</span>
                <span className={`${componentClass}__field`}>
                    <input
                        className={`${componentClass}__input`}
                        type="text"
                        name={name}
                        disabled={disabled}
                        placeholder="дд.мм.гггг"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onClick={() => !disabled && setShowCalendar((v) => !v)}
                    />
                    <img
                        className={`${componentClass}__icon`}
                        src={
                            isPicked
                                ? "/assets/svg/interface/black/Date.svg"
                                : "/assets/svg/interface/black/Date_add.svg"
                        }
                        alt="toggle calendar"
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
                        selectedDate={value ? parseISO(value) : new Date()}
                        onChange={handleDateSelect}
                        onCancel={() => setShowCalendar(false)}
                    />
                </div>
            )}
        </div>
    );
};
