import { Request, Response } from "express";
import mongoose from "mongoose";

import { CalendarEventModel } from "../models/calendarEvent.dbmodel";
import { JwtPayload } from "../types";
import { CalendarEvent } from "../types/CalendarEvent";
import { NewCalendarEvent } from "../types/NewCalendarEvent";

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { jwtPayload } = req.body as JwtPayload;

    const events = await CalendarEventModel.find({
      userId: jwtPayload.uid,
    }).populate("userId", "_id firstname lastname");

    return res.json({
      success: true,
      payload: events.map((event) => ({
        id: event.id,
        title: event.title,
        notes: event.notes,
        start: event.start,
        end: event.end,
        user: event.userId,
      })),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Por favor hable con el admninistrador",
    });
  }
};

export const createEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { jwtPayload, ...newCalendarEvent } = req.body as NewCalendarEvent &
      JwtPayload;

    const calendarEvent = await new CalendarEventModel({
      ...newCalendarEvent,
      // this is a scape hatch because if notes is empty, moongose will throw an error
      notes: newCalendarEvent.notes || " ",
      userId: new mongoose.Types.ObjectId(jwtPayload.uid),
    }).save();

    return res.json({
      success: true,
      payload: {
        id: calendarEvent.id,
        title: calendarEvent.title,
        notes: calendarEvent.notes,
        start: calendarEvent.start,
        end: calendarEvent.end,
        user: {
          uid: jwtPayload.uid,
          firstName: jwtPayload.firstname,
          lastName: jwtPayload.lastname,
        },
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

export const updateEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { eventId } = req.params;
  const { jwtPayload, ...calendarEvent } = req.body as CalendarEvent &
    JwtPayload;

  const calendarEventFound = await CalendarEventModel.findOneAndUpdate(
    { _id: eventId, userId: jwtPayload.uid },
    {
      id: calendarEvent.id,
      title: calendarEvent.title,
      notes: calendarEvent.notes,
      start: calendarEvent.start,
      end: calendarEvent.end,
    },
    { new: true }
  );

  if (!calendarEventFound) {
    return res.status(404).json({
      success: false,
      message: "Evento no encontrado",
    });
  }

  try {
    return res.json({
      success: true,
      payload: {
        id: calendarEventFound.id,
        title: calendarEventFound.title,
        notes: calendarEventFound.notes,
        start: calendarEventFound.start,
        end: calendarEventFound.end,
        user: {
          uid: jwtPayload.uid,
          firstName: jwtPayload.firstname,
          lastName: jwtPayload.lastname,
        },
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

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { jwtPayload } = req.body as JwtPayload;
  const { eventId } = req.params;

  const calendarEventDeleted = await CalendarEventModel.findOneAndDelete({
    _id: eventId,
    userId: jwtPayload.uid,
  });

  if (!calendarEventDeleted) {
    return res.status(404).json({
      success: false,
      message: "No se encontro el evento",
    });
  }

  try {
    return res.json({
      success: true,
      payload: {
        id: calendarEventDeleted.id,
        title: calendarEventDeleted.title,
        notes: calendarEventDeleted.notes,
        start: calendarEventDeleted.start,
        end: calendarEventDeleted.end,
        user: {
          uid: jwtPayload.uid,
          firstName: jwtPayload.firstname,
          lastName: jwtPayload.lastname,
        },
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
