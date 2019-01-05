import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import socketIO from "socket.io";
import http from "http";
import cors from "cors";

// Import delle configurazioni e file utili
import { getLogger } from "../config/log";
const logger = getLogger("server");

import { config } from "../config/conf";
import { normalizePort } from "./utils/utils";

// Configurazioni iniziali di porta, DEBUG e /api route
import api from "./routes/api.route";
const DEBUG = config.node_env === "development";
const port = normalizePort(config.server_port);

// Inizializzazione del app express, server http e server socketio
export const app = express();
export const server = http.createServer(app);
export const io = socketIO(server, { serveClient: DEBUG });

// Setup del sistema di logging del api rest
app.set("env", config.node_env);
if (DEBUG) {
  app.use(
    morgan(":method :url :status :response-time ms", {
      stream: {
        write(message) {
          logger.info(message);
        }
      }
    })
  );
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

app.use(async (req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// Error handler
app.use(async (err: Error, req: any, res: any, next: Function) => {
  //@ts-ignore
  const status = err.status || 500;
  if (req.app.get("env") === "development") {
    logger.error(err);
    res.status(status).json({
      status,
      result: err.message,
      "stack-trace": err.stack
    });
  } else {
    res.status().json({
      status
    });
  }
});

server.on("error", async error => {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  //@ts-ignore
  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", async () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  logger.verbose(`Listening on ${bind}`);
});

server.listen(port);
