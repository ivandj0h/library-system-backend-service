import { Request, Response, NextFunction } from "express";
import { StatusCodes, Messages } from "@/constants/constants";
import { getDecodedToken } from "@/utils/auth";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: Messages.UNAUTHORIZED,
      data: null,
    });
    return;
  }

  const decodedToken = getDecodedToken();

  if (authHeader !== decodedToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: Messages.INVALID_TOKEN,
      data: null,
    });
    return;
  }

  next();
};
