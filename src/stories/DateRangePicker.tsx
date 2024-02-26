import "../app/globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { DAYS, getCalendarDays, getMonthName } from "./helpers";

export const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date>();
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  const handleDateSelection = (dt: Date) => {
    // console.log("hi", dt);
    if (!startDate) {
      setStartDate(dt);
    } else if (!endDate) {
      if (dt.getTime() - startDate.getTime() > 0) {
        setStartDate(dt);
      } else {
        setEndDate(dt);
      }
    } else {
      setStartDate(dt);
    }
  };

  const handleTheme = (dt: Date) => {
    // console.log("dtt", dt, startDate);
    if (startDate) {
      if (startDate.getTime() - dt.getTime() === 0) {
        return "bg-blue-500";
      } else if (endDate) {
        if (endDate.getTime() - dt.getTime()) {
          return "bg-blue-500";
        } else if (
          dt.getTime() > startDate.getTime() &&
          dt.getTime() < endDate.getTime() &&
          ![0, 6].includes(dt.getDay())
        ) {
          return "bg-blue-300";
        }
      }
    }
  };

  const renderCalendarDays = useCallback(() => {
    let currDate = new Date(date.setDate(1)); // let problem ? remains unchanged ?
    const currMonth = currDate.getMonth();
    console.log("currDate", currDate);
    const calArr = getCalendarDays(currDate, currMonth);
    console.log("calArr", calArr);
    return calArr.map((cal, i) => {
      return (
        <tr key={i} className="text-xs flex items-center gap-3">
          {cal.map((item) => (
            <td
              key={`${item.date}${i}`}
              onClick={() => handleDateSelection(item.fullDate)}
              className={`${
                item.class
              } cursor-pointer w-5 text-center ${handleTheme(item.fullDate)}`}
            >
              {item.date}
            </td>
          ))}
        </tr>
      );
    });
  }, [date]);
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold px-1">
        <button onClick={() => {}}>&lt;</button>
        <p className=" hover:bg-neutral-200 rounded px-2 py-0.5 cursor-pointer">{`${getMonthName(
          date.getMonth()
        )}, ${date.getFullYear()}`}</p>
        <button onClick={() => {}}>&gt;</button>
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
    </section>
  );
};
