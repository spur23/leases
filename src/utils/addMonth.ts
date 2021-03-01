export const addMonth = (date: Date, months: number): Date => {
  const month = date.getMonth() + months - 1;
  const year = date.getFullYear();

  if (month === 11) {
    return new Date(year + 1, 0, 1);
  } else {
    return new Date(year, month + 1, 1);
  }
};
