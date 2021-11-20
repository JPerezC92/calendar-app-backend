import { Application, Router } from "express";

import authRouter from "./auth.router";
import eventRouter from "./event.router";

/* 
    This is the main router for the application.
    It is responsible for mounting all of the other routers.
    
    The reason that we have this router is because we want to be able to mount all of the other routers
    at the same level.

    We can do this by using the Router() function from express.
*/

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/events", eventRouter);

export const loadApiEndpoints = (app: Application): void => {
  app.use("/", Router().use("/api", mainRouter));
};
