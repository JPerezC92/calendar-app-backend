import { Request, Response } from "express";

export const login = (req: Request, res: Response): Response => {
  const credentials = req.body;

  return res.json({
    message: "login",
    payload: credentials,
  });
};

export const register = (req: Request, res: Response): Response => {
  const newUser = req.body;

  return res.status(201).json({
    message: "register",
    payload: newUser,
  });
};

export const renewToken = (req: Request, res: Response): void => {
  const token = "new token";
  res.json({
    message: "renew token",
    payload: token,
  });
};
