import { Router } from "express";

import { login, register, renewToken } from "../controllers/auth.controller";

/* 
    This is the router for the authentication routes.
    host: http://localhost:{PORT}/api/auth
*/

const authRouter = Router();

authRouter.post("/", login);
authRouter.post("/register", register);
authRouter.get("/renew-token", renewToken);

export default authRouter;
