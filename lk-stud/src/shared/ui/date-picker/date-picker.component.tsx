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
    datePlaceholder:string,
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
    datePlaceholder
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

    const applyMask = (value: string): string => {
        const digits = value.replace(/\D/g, "");

        if (digits.length <= 2) {
            return digits;
        } else if (digits.length <= 4) {
            return `${digits.slice(0, 2)}.${digits.slice(2)}`;
        } else if (digits.length <= 8) {
            return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
        } else {
            return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4, 8)}`;
        }
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const rawValue = e.target.value;
        const maskedValue = applyMask(rawValue);
        setInputValue(maskedValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End'
        ];

        if (allowedKeys.includes(e.key)) {
            return;
        }

        if (e.ctrlKey && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
            return;
        }

        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
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

        const parsed = parse(inputValue, "dd.MM.yyyy", new Date());
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
                        placeholder={datePlaceholder}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onBlur={handleInputBlur}
                        maxLength={10} 
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