import { useState } from "react";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    subMonths,
    format,
    isSameMonth,
    isSameDay,
} from "./dateUtils";
import "./calendar.css";

type CalendarProps = {
    selectedDate: Date;
    onChange: (date: Date) => void;
    onCancel: () => void;
};

export const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    onChange,
    onCancel,
}) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(
        startOfMonth(selectedDate)
    );
    const [tempDate, setTempDate] = useState<Date>(selectedDate);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextYear = () => setCurrentMonth(addMonths(currentMonth, 12));
    const prevYear = () => setCurrentMonth(subMonths(currentMonth, 12));

    const renderHeader = () => (
        <div className="calendar__header">
            <div className="calendar-control__wrapper">
                <div className="calendar__control">
                    <img
                        src="/assets/svg/Arrow/black/Chevron_Left_MD.svg"
                        onClick={prevMonth}
                        className="calendar__nav"
                        alt="prev month"
                    />
                    <span className="calendar__control-title">
                        {format(currentMonth, "LLLL")}
                    </span>
                    <img
                        src="/assets/svg/Arrow/black/Chevron_Right_MD.svg"
                        onClick={nextMonth}
                        className="calendar__nav"
                        alt="next month"
                    />
                </div>
                <div className="calendar__control">
                    <img
                        src="/assets/svg/Arrow/black/Chevron_Left_MD.svg"
                        onClick={prevYear}
                        className="calendar__nav"
                        alt="prev year"
                    />
                    <span className="calendar__control-title">
                        {format(currentMonth, "yyyy")}
                    </span>
                    <img
                        src="/assets/svg/Arrow/black/Chevron_Right_MD.svg"
                        onClick={nextYear}
                        className="calendar__nav"
                        alt="next year"
                    />
                </div>
            </div>
            <div className="calendar__divider" />
        </div>
    );

    const renderDaysOfWeek = () => {
        const days = [];
        const start = startOfWeek(currentMonth, { weekStartsOn: 1 });
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="calendar__weekday">
                    {format(addDays(start, i), "EE")}
                </div>
            );
        }
        return <div className="calendar__weekdays">{days}</div>;
    };

    const renderDates = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
        const rows: React.ReactNode[] = [];
        let day = startDate;

        while (day <= endDate) {
            const week: React.ReactNode[] = [];
            for (let i = 0; i < 7; i++) {
                const clone = day;
                const disabled = !isSameMonth(day, monthStart);
                const selected = isSameDay(day, tempDate);
                const today = isSameDay(day, new Date());

                week.push(
                    <div
                        key={day.toString()}
                        className={[
                            "calendar__date",
                            disabled && "calendar__date_disabled",
                            selected && "calendar__date_selected",
                            today && "calendar__date_today",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        onClick={() => {
                            if (!disabled) {
                                setTempDate(clone);
                            }
                        }}
                    >
                        {format(day, "d")}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="calendar__row" key={day.toString()}>
                    {week}
                </div>
            );
        }

        return <div className="calendar__body">{rows}</div>;
    };

    return (
        <div className="calendar">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderDates()}
            <div className="calendar__footer">
                <button
                    onClick={() => onChange(tempDate)}
                    className="calendar__btn"
                >
                    Ок
                </button>
                <button onClick={onCancel} className="calendar__btn">
                    Отмена
                </button>
            </div>
        </div>
    );
};
