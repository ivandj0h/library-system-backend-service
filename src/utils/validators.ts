export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1500 && year <= currentYear;
};
