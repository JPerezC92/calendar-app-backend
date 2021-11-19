import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { databaseConnection } from "./database/config";
import { loadApiEndpoints } from "./routes";

dotenv.config();

// Create Express server

const app = express();

app.use(cors());

databaseConnection();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
