import "../app/globals.css";
import React, { useState } from "react";
import { DateRangePicker } from "./components/DateRangePicker";
import { OutsideClickHandler } from "./components/OutsideClickHandler";
import { getWeekendDates } from "./helpers";

export const Calendar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | null>();

  const handleLastDaysSelection = (days: number) => {
    const todayDate = new Date();
    const lastSeventhDate = new Date(
      todayDate.setDate(todayDate.getDate() - days)
    );
    function adjustWeekendDate(date: Date) {
      if ([0, 6].includes(date.getDay())) {
        const adjustment = date.getDay() ? -1 : 1;
        date.setDate(date.getDate() + adjustment);
      }
      return date;
    }
    const [firstDate, seventhDate] = [
      adjustWeekendDate(lastSeventhDate),
      adjustWeekendDate(todayDate),
    ];
    setStartDate(firstDate);
    setEndDate(seventhDate);
  };

  const handleDateSelection = (dt: Date) => {
    if (![0, 6].includes(dt.getDay())) {
      if (!startDate) {
        setStartDate(dt);
      } else if (!endDate) {
        if (dt.getTime() - startDate.getTime() < 0) {
          setStartDate(dt);
        } else {
          setEndDate(dt);
        }
      } else {
        setStartDate(dt);
        setEndDate(null);
      }
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsCalendarOpen(false)}>
      <article
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-1"
      >
        <div className="flex flex-col gap-1 text-xs">
          {startDate && endDate && (
            <>
              <div className="flex items-center gap-1">
                <h3>Date Range</h3>
                <p>{`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}</p>
              </div>
              <div className="flex items-center gap-1">
                <h3>Weekends</h3>
                <p>{getWeekendDates(startDate, endDate).join(", ")}</p>
              </div>
            </>
          )}
        </div>
        <div className="relative flex flex-col gap-1">
          <button
            onClick={() => setIsCalendarOpen((prev) => !prev)}
            className="border-2 w-52 px-1 py-2 rounded-md"
          >
            📅 Calendar
          </button>
          {isCalendarOpen ? (
            <div className="absolute top-12">
              <DateRangePicker
                startDate={startDate}
                onDateSelection={handleDateSelection}
                endDate={endDate}
                onLastDaysSelection={handleLastDaysSelection}
              />
            </div>
          ) : null}
        </div>
      </article>
    </OutsideClickHandler>
  );
};
