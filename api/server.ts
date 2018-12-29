import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import socketIO from "socket.io";
import http from "http";
import cors from "cors";

import { config } from "../config/conf";
import { normalizePort } from "./utils/utils";
import { SubscriveToEvent } from "../config/bus";
import IDevice from "../Iot-controller/interfaces/IDevice";

import api from "./routes/api.route";
const node_env = config.node_env;
const port = normalizePort(config.server_port);

export const app = express();
export const server = http.createServer(app);
export const io = socketIO(server, { serveClient: node_env === "development" });

app.set("env", node_env);
if (node_env === "development") {
  app.use(logger("dev"));
}

app.use(
  cors({
    origin: "*",
    credentials: true,
    method: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", api);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: any, res: any, next: Function) => {
  if (req.app.get("env") === "development") {
    console.error(err);
  }
  res.status(err.status || 500).send();
});

server.on("error", error => {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  //@ts-ignore
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind}`);
});

// Socket io stuff
SubscriveToEvent("device-state-change", (dev: IDevice) => {
  io.sockets.emit("device-state-change", dev);
});

io.on("connection", socket => {
  socket.emit("READY");
  socket.on("disconnecting", reason => {
    console.log("Il socket si sta disconnettendo per:", reason);
  });
});

server.listen(port);
