import { Request, Response } from "express";

export const login = (req: Request, res: Response): void => {
  const credentials = req.body;

  res.json({
    message: "login",
    payload: credentials,
  });
};

export const register = (req: Request, res: Response): Response => {
  const newUser = req.body;

  if (newUser.name.length < 5) {
    return res.status(400).json({
      message: "Invalid name",
    });
  }

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
