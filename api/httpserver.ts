import http from "http";

import { app } from "./restapi";
import { getLogger } from "../config/log";
import { config } from "../config/conf";
const logger = getLogger("SERVER");

export const server = http.createServer(app);

server.on("error", error => {
  //@ts-ignore
  if (error.syscall !== "listen") {
    throw error;
  }

  //@ts-ignore
  switch (error.code) {
    case "EACCES":
      logger.error(
        "Port " + config.server_port + " requires elevated privileges"
      );
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error("Port " + config.server_port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  logger.verbose(`Listening on port ${config.server_port}`);
});
