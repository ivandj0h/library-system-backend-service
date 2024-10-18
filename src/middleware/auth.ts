import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { StatusCodes, Messages } from "@/constants/constants";

// Decode Base64 token
const decodeToken = (encodedToken: string) => {
  return Buffer.from(encodedToken, "base64").toString("utf-8");
};

const tokenPath = path.resolve(__dirname, "../../data/token.json");

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

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf-8"));
  const decodedToken = decodeToken(tokenData.token);

  if (authHeader !== decodedToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: "error",
      message: Messages.INVALID_TOKEN,
      data: null,
    });
    return;
  }

  next(); // Continue if token is valid
};
