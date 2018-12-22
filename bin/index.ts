/**
 * Entry point del server
 */

// Setup event bus e mongoose
import { EventBus } from "../api/src/config/bus";
import { mongoose } from "../api/src/config/db";
export { EventBus, mongoose };

// Setup API
import { server } from "../api/server";
export { server };

setInterval(() => {
  EventBus.emit("device-state-change", { id: Math.random() });
}, 1000);

// Dgram socket listener
import { createSocket, Socket } from "dgram";

const UDP_PORT: number = 0xcafe;

const udpsocket: Socket = createSocket("udp4");

udpsocket.on("close", () => console.log("Socket closed."));
udpsocket.on("error", e => console.log(e.message));
udpsocket.on("listening", () => {
  udpsocket.setBroadcast(true);
  console.log(`Socket listening for broadcast messages on port ${UDP_PORT}`);
});
udpsocket.on("message", m => console.log(`Recieved message: ${m}`));

udpsocket.bind(UDP_PORT);
