import { Router } from "express";

import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../controllers/event.controller";
import { validateFields } from "../middlewares/auth";
import { validateJWT } from "../middlewares/auth/validateJWT";
import * as eventValidator from "../validations/event.validator";

/* 
    This is the router for the events routes.
    host: http://localhost:{{PORT}}/api/events
*/

const eventRouter = Router();
eventRouter.use(validateJWT);

eventRouter.get("/", getAllEvents);

eventRouter.post(
  "/",
  eventValidator.newCalendarEventValidation,
  validateFields,
  createEvent
);

eventRouter.put(
  "/:eventId",
  [eventValidator.eventIdValidation],
  validateFields,
  updateEvent
);

eventRouter.delete(
  "/:eventId",
  [eventValidator.eventIdValidation],
  validateFields,
  deleteEvent
);

export default eventRouter;
