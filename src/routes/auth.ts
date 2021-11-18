import { Router } from "express";

import { login, register, renewToken } from "../controllers/auth.controller";
import { validateFields } from "../middlewares/validate-fields";
import * as authValidator from "../validations/auth";

/* 
    This is the router for the authentication routes.
    host: http://localhost:{PORT}/api/auth
*/

const authRouter = Router();

authRouter.post(
  "/",
  authValidator.credentialsValidation,
  validateFields,
  login
);

authRouter.post(
  "/register",
  [...authValidator.credentialsValidation, authValidator.name],
  validateFields,
  register
);

authRouter.get("/renew-token", [], renewToken);

export default authRouter;
