import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import socketIO from "socket.io";
import http from "http";
import cors from "cors";

// Import delle configurazioni e file utili
import { config } from "../config/conf";
import { normalizePort } from "./utils/utils";
import { SubscriveToEvent } from "../config/bus";
import { DeviceCounter } from "../udp/manager/devicecounter";
import IDevice from "../Iot-controller/interfaces/IDevice";

// Configurazioni iniziali di porta, node_env e /api route
import api from "./routes/api.route";
const node_env = config.node_env;
const port = normalizePort(config.server_port);

// Inizializzazione del app express, server http e server socketio
export const app = express();
export const server = http.createServer(app);
export const io = socketIO(server, { serveClient: node_env === "development" });

// Setup del sistema di logging del api rest
app.set("env", node_env);
if (node_env === "development") {
  app.use(logger("dev"));
}

// Setup cross origin per il futuro e parsing delle richieste
app.use(
  cors({
    origin: "*",
    credentials: true,
    //method: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bind della route /api
app.use("/api", api);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// Error handler
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
SubscriveToEvent("device-state-changed", (dev: IDevice) => {
  io.sockets.emit("device-state-changed", dev);
});

SubscriveToEvent("device-new", (dev: IDevice) => {
  io.sockets.emit("device-new", dev);
});

io.on("connection", async socket => {
  // Invia tutti i dispositivi attualmente connessi al nuovo client
  const devs: IDevice[] = await DeviceCounter.getAll();
  socket.emit("READY", devs);
  socket.on("disconnecting", reason => {
    console.log("Il socket si sta disconnettendo per:", reason);
  });
});

server.listen(port);
