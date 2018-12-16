import createSocket from "socket.io";
import { Server } from "http";

export function socket(server: Server): void {
  const listener = createSocket(server);

  listener.on("connection", io => {
    io.emit("READY");
  });
}

export default socket;
