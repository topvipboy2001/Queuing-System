export const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date).getDate());
    date.setDate(date.getDate() + 1);
  }

  return days;
};

export const getMonthInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const getWeekInMonth = [1, 2, 3, 4];

export const weekCount = (year: number, month: number, day: number) => {
  const firstWeekday = new Date(year, month, 1).getDay();
  const offsetDate = day + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
};
