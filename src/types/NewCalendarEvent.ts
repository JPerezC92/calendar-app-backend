import { CalendarEvent } from "./CalendarEvent";

export type NewCalendarEvent = Omit<CalendarEvent, "id">;
