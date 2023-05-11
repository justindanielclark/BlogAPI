import { NextFunction, Request, Response } from "express";

export default async function setHeadersAndStatusOK(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Language", "en");
  res.status(200);
  return next();
}
