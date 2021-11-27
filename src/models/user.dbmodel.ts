import { model, Schema } from "mongoose";

import { User } from "../types";

const UserMongoSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        return {
          uid: ret._id,
          firstname: ret.firstname,
          lastname: ret.lastname,
          email: ret.email,
          password: ret.password,
        };
      },
    },
  }
);

export const UserModel = model<User>("User", UserMongoSchema);
