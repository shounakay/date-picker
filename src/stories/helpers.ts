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

export const getCalendarDays = (currDate, currMonth) => {
  return Array.from({ length: 6 }, (_) => {
    const arr = [];
    for (let i = 0; i < DAYS.length; i++) {
      if (currDate.getDay() !== i) {
        if (currDate.getDay() > i) {
          const diff = Math.abs(currDate.getDay() - i);
          const dt = new Date(currDate.setDate(currDate.getDate() - diff));
          arr.push({
            date: dt.getDate(),
            class: "text-neutral-400",
            fullDate: currDate,
          });
        }
      } else {
        arr.push({
          date: currDate.getDate(),
          fullDate: currDate,
          ...(currDate.getMonth() !== currMonth && {
            class: "text-neutral-400",
          }),
        });
      }
      currDate = new Date(currDate.setDate(currDate.getDate() + 1));
      //   currDate = new Date(incrementedDate.setHours(0, 0, 0, 0));
    }
    return arr;
  });
};
