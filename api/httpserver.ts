import http from "http";

import { app } from "./restapi";
import { getLogger } from "../config/log";
const logger = getLogger("SERVER");

export const server = http.createServer(app);

server.on("error", async error => {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

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
