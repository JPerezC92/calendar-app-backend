import * as bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import { generateJWT } from "../helpers/generateJWT";
import { UserModel } from "../models";
import { Credentials, JwtPayload, NewUser } from "../types";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const credentials = req.body as Credentials;
    const user = await UserModel.findOne({ email: credentials.email });

    if (!user) {
      throw new Error("Usuario o contraseña invalidos");
    }

    const token = await generateJWT(user._id, user.firstname, user.lastname);

    return res.json({
      success: true,
      payload: {
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        token,
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

    const token = await generateJWT(user.id, user.firstname, user.lastname);

    return res.status(201).json({
      success: true,
      payload: {
        user: {
          uid: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        token,
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

export const renewToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { jwtPayload } = req.body as JwtPayload;

    const token = await generateJWT(
      jwtPayload.uid,
      jwtPayload.firstname,
      jwtPayload.lastname
    );

    return res.json({
      success: true,
      payload: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Por favor hable con el admninistrador",
    });
  }
};
