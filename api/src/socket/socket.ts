import socketio from "socket.io";
import { Server } from "http";
import { EventBus } from "../config/bus";

export function socket(server: Server): void {
  const io = socketio(server, {
    serveClient: process.env.DEBUG ? true : false
  });

  EventBus.on("device-state-change", dev => {
    io.sockets.emit("device-state-change", dev);
  });

  io.on("connection", socket => {
    socket.emit("READY");
    socket.on("disconnecting", reason => {
      console.log("Il socket si sta disconnettendo per:", reason);
    });
  });
}

export default socket;
