import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import { UserModel } from "../models";
import { NewUser } from "../types";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const credentials = req.body;
    const user = await UserModel.findOne({ email: credentials.email });

    return res.json({
      success: true,
      payload: {
        id: user?._id,
        email: user?.email,
        name: user?.name,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Por favor hable con el admninistrador",
    });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newUser = req.body as NewUser;

    const salt = await bcryptjs.genSalt();
    const hashedPassword = bcryptjs.hashSync(newUser.password, salt);
    newUser.password = hashedPassword;

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
