// @ts-check

/**
 * Entry point del server
 */

// Setup API

import { app, socket, EventBus } from "../api/server";

import http from "http";

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);

function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

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
}

// Setup socket

socket(server);

// Start listening for connections
server.listen(port);

server.on("error", onError);

server.on("listening", () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind}`);
});

setInterval(() => {
  EventBus.emit("device-state-change", { id: Math.random() });
}, 1000);
