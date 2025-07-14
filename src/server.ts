/* eslint-disable no-console */
import { Server } from "http";

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    console.log(envVars.NODE_ENV);
    await mongoose.connect(envVars.DB_URL);

    console.log("Connected to db");
    server = app.listen(envVars.PORT, () => {
      console.log("Server listening at port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// unhandled rejection error
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected... server shutting", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught rejection error
process.on("uncaughtException", (err) => {
  console.log("Uncaught rejection detected... server shutting", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// signal termination sigterm
process.on("SIGTERM", () => {
  console.log("server shutting");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I fogot to catch this error"));
// throw new Error("Oppssss")

// unhandled rejection error
// uncaught rejection error
// signal termination sigterm
