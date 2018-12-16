import socketio from "socket.io";
import { Server } from "http";
import { EventBus } from "../config/bus";

export function socket(server: Server): void {
  const io = socketio(server);
  let sockets: Array<socketio.Socket> = [];

  // Anti-memory-leak strategy
  EventBus.on("device-state-change", dev => {
    sockets.forEach(socket => socket.emit("device-state-change", dev));
  });

  io.on("connection", socket => {
    socket.emit("READY");
    sockets.push(socket);

    socket.on("disconnecting", reason => {
      // Non la soluzione piu elegane ma hey funziona
      sockets = sockets.filter(s => s !== socket);
      console.log("Il socket si sta disconnettendo per:", reason);
      console.log("Socket connessi:", sockets.length);
    });
    console.log("Socket connessi:", sockets.length);
  });
}

export default socket;
