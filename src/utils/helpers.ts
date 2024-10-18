export const isValidYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= 1500 && year <= currentYear;
};

export const sendResponse = (
  res: any,
  statusCode: number,
  message: string,
  data: any = null
): void => {
  res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "error",
    message: message,
    data: data,
  });
};
