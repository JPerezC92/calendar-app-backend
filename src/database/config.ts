import mongoose from "mongoose";

export const databaseConnection = async (): Promise<void> => {
  try {
    if (process.env.NODE_ENV === "development") {
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("Database is connected");
    }

    if (process.env.NODE_ENV === "test") {
      await mongoose.connection.close();
      console.log("Database is disconnected");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Database connection error");
  }
};
