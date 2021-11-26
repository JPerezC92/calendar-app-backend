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
    console.log({ jwtPayload });

    const events = await CalendarEventModel.find({
      user: jwtPayload.uid,
    }).populate("user", "firstname lastname");

    return res.json({
      success: true,
      payload: events,
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
  const { jwtPayload, ...newCalendarEvent } = req.body as NewCalendarEvent &
    JwtPayload;

  const calendarEvent = await new CalendarEventModel({
    ...newCalendarEvent,
    user: new mongoose.Types.ObjectId(jwtPayload.uid),
  }).save();

  try {
    return res.json({
      success: true,
      payload: calendarEvent,
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
    { _id: eventId, user: jwtPayload.uid },
    { ...calendarEvent },
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
      payload: calendarEventFound,
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
    user: jwtPayload.uid,
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
      payload: calendarEventDeleted,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Por favor hable con el admninistrador",
    });
  }
};
