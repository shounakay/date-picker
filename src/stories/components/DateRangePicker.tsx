import "../../app/globals.css";
import React, { useCallback, useState } from "react";
import {
  DAYS,
  areDatesEqual,
  getCalendarDays,
  getDateStyles,
  getMonthName,
} from "../helpers";
import { YearsWithMonths } from "./YearsWithMonths";
import { PredefinedRanges } from "./PredefinedRanges";

export const DateRangePicker = ({
  startDate,
  endDate,
  onDateSelection,
  onLastDaysSelection,
}: {
  startDate: Date;
  endDate: Date;
  onDateSelection: (dt: Date) => void;
  onLastDaysSelection: (days: number) => void;
}) => {
  const [date, setDate] = useState(new Date());
  const [isPickYear, setIsPickYear] = useState(false);

  const handleTheme = (dt: Date) => {
    if (startDate) {
      const dateStyle = "bg-blue-500 rounded-2xl text-neutral-800";
      if (areDatesEqual(dt, startDate)) {
        return dateStyle;
      } else if (endDate) {
        if (areDatesEqual(endDate, dt)) {
          return dateStyle;
        } else if (
          dt.getTime() > startDate.getTime() &&
          dt.getTime() < endDate.getTime() &&
          ![0, 6].includes(dt.getDay())
        ) {
          return "bg-blue-300 rounded-2xl";
        }
      }
    }
  };

  const renderCalendarDays = useCallback(
    () =>
      getCalendarDays(date).map((cal, i) => {
        return (
          <tr key={i} className="text-xs flex items-center gap-3">
            {cal.map((item) => (
              <td
                key={`${item.date}${i}`}
                onClick={() => onDateSelection(item.fullDate)}
                className={getDateStyles(
                  item.class as string,
                  item.fullDate,
                  handleTheme
                )}
              >
                {item.date}
              </td>
            ))}
          </tr>
        );
      }),
    [date, startDate, endDate]
  );

  const togglePrevMonth = (isPrev: boolean) => {
    const newDate = new Date(
      date.setMonth(isPrev ? date.getMonth() - 1 : date.getMonth() + 1)
    );
    setDate(newDate);
  };

  const handleMonthSelection = (year: number, month: number) => {
    const newDate = new Date(year, month - 1, 1);
    setDate(newDate);
    setIsPickYear(false);
  };

  return (
    <section className="flex flex-col gap-2 border-[1px] border-neutral-500 rounded-md px-1 py-1">
      {isPickYear ? (
        <YearsWithMonths onMonthSelection={handleMonthSelection} />
      ) : (
        <>
          <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold px-1">
            <button onClick={() => togglePrevMonth(true)}>&lt;</button>
            <p
              onClick={() => setIsPickYear(true)}
              className="hover:bg-neutral-200 rounded px-2 py-0.5 cursor-pointer transition-all"
            >{`${getMonthName(date.getMonth())}, ${date.getFullYear()}`}</p>
            <button onClick={() => togglePrevMonth(false)}>&gt;</button>
          </div>
          <table>
            <thead className="flex items-center text-xs text-red-500 max-w-fit">
              <tr className="flex items-center gap-[6px]">
                {DAYS.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>{renderCalendarDays()}</tbody>
          </table>
          <PredefinedRanges onLastDaysSelection={onLastDaysSelection} />
        </>
      )}
    </section>
  );
};
