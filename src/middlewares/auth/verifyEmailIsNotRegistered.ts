import { NextFunction, Request, Response } from "express";

import { UserModel } from "../../models";
import { NewUser } from "../../types";

export const verifyEmailIsNotRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body as NewUser;

  const user = await UserModel.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "El usuario ya existe",
    });
  }

  next();
};
