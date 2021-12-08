import { model, Schema } from "mongoose";

import { CalendarEvent } from "../types/CalendarEvent";

const CalendarEventMongoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        return {
          id: ret._id,
          title: ret.title,
          notes: ret.notes,
          start: ret.start,
          end: ret.end,
          userId: ret.userId,
        };
      },
    },
  }
);

// CalendarEventMongoSchema.method("toJSON", function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.id = _id;
//   return object;
// });

export const CalendarEventModel = model<CalendarEvent>(
  "CalendarEvent",
  CalendarEventMongoSchema
);
