import { NextFunction, Request, Response, Router } from "express";

import { login, register, renewToken } from "../controllers/auth.controller";
import {
  validateFields,
  verifyCredentials,
  verifyEmailIsNotRegistered,
} from "../middlewares/auth";
import { validateJWT } from "../middlewares/auth/validateJWT";
import * as authValidator from "../validations/auth.validator";

/* 
    This is the router for the authentication routes.
    host: http://localhost:{{PORT}}/api/auth
*/

const authRouter = Router();

authRouter.post("/", [verifyCredentials], login);

authRouter.post(
  "/register",
  [...authValidator.credentialsValidation, authValidator.name],
  [validateFields, verifyEmailIsNotRegistered],
  register
);

authRouter.get("/renew-token", [validateJWT], renewToken);

export default authRouter;
