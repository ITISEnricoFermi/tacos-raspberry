import socketio from "socket.io";
import { Server } from "http";

export function socket(server: Server): void {
  const io = socketio(server);

  io.on("connection", socket => {
    socket.emit("READY");
  });
}

export default socket;
