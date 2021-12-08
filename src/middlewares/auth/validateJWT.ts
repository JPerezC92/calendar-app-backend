import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JwtPayload } from "../../types";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No se adjunto el token." });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.body.jwtPayload = payload;

    next();
  } catch (error) {
    console.log({ error });
    return res.status(401).json({
      success: false,
      message: "Por favor hable con el administrador.",
    });
  }
};
