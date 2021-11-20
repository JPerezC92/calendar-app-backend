import { check, param } from "express-validator";

export const titleValidation = check("title", "El titulo es invalido")
  .exists()
  .isString();

export const notesValidation = check("notes", "La nota es invalida")
  .exists()
  .isString();

const UTCdateRegex =
  /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export const startValidation = check("start", "La fecha de inicio es invalida")
  .exists()
  .matches(UTCdateRegex);

export const endValidation = check("end", "La fecha de fin es invalida")
  .exists()
  .matches(UTCdateRegex);

export const newCalendarEventValidation = [
  titleValidation,
  notesValidation,
  startValidation,
  endValidation,
];

export const eventIdValidation = param(
  "eventId",
  "El id del evento es invalido"
)
  .isLength({ min: 10 })
  .exists()
  .isString();
