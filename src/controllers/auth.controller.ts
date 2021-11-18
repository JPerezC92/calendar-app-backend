import { Request, Response } from "express";

import { UserModel } from "../models";
import { NewUser } from "../types";

export const login = (req: Request, res: Response): Response => {
  const credentials = req.body;

  return res.json({
    message: "login",
    payload: credentials,
  });
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newUser = req.body as NewUser;
    const user = new UserModel(newUser);
    await user.save();

    return res.status(201).json({
      success: true,
      payload: newUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Por favor hable con el admninistrador",
    });
  }
};

export const renewToken = (req: Request, res: Response): void => {
  const token = "new token";
  res.json({
    message: "renew token",
    payload: token,
  });
};
