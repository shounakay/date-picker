export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getMonthName = (num: number) => {
  switch (num) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
  }
};

export const getCalendarDays = (date: Date) => {
  let currDate = new Date(date.setDate(1));
  const currMonth = date.getMonth();
  return Array.from({ length: 6 }, (_) => {
    const arr = [];
    for (let i = 0; i < DAYS.length; i++) {
      if (currDate.getDay() !== i) {
        const diff = Math.abs(currDate.getDay() - i);
        const newDate = new Date(currDate);
        newDate.setDate(currDate.getDate() - diff);
        arr.push({
          date: newDate.getDate(),
          class: "text-neutral-400",
          fullDate: newDate,
        });
        currDate.setDate(currDate.getDate() - diff);
      } else {
        const newDate = new Date(currDate);
        arr.push({
          date: currDate.getDate(),
          fullDate: newDate,
          ...(currDate.getMonth() !== currMonth && {
            class: "text-neutral-400",
          }),
        });
      }
      currDate = new Date(currDate.setDate(currDate.getDate() + 1));
    }
    return arr;
  });
};

export const areDatesEqual = (dt1: Date, dt2: Date) => {
  if (
    dt1.getFullYear() === dt2.getFullYear() &&
    dt1.getMonth() === dt2.getMonth() &&
    dt1.getDate() === dt2.getDate()
  ) {
    return true;
  }
  return false;
};

export const getDateStyles = (
  style: string,
  fullDate: Date,
  handleTheme: (dt: Date) => void
) =>
  `${style} w-5 text-center ${handleTheme(fullDate)} ${
    ![0, 6].includes(fullDate.getDay())
      ? "cursor-pointer"
      : "cursor-not-allowed"
  } ${
    areDatesEqual(fullDate, new Date())
      ? "border-2 rounded-md border-blue-500"
      : ""
  }`;

export const getWeekendDates = (startDate: Date, endDate: Date) => {
  const weekendDates = [];

  // Iterate through each day between startDate and endDate
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDates.push(new Date(currentDate).toLocaleDateString());
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekendDates;
};
