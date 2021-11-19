import * as bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "../../models";
import { Credentials } from "../../types";

export const verifyCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body as Credentials;

  const userExist = await UserModel.findOne({ email });

  const message = "Usuario o contraseña invalidos";
  if (!userExist) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const validPassword = bcryptjs.compareSync(password, userExist.password);

  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  next();
};
