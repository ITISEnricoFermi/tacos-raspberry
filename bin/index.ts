/**
 * Entry point del server
 */

// Setup event bus e mongoose
import { EventBus } from "../config/bus";

// Setup udp socket
import { sendData } from "../udp/udpsocket";

// Setup API
import { server } from "../api/server";
export { server };

// testing some things
setInterval(() => {
  EventBus.emit("device-state-change", { id: Math.random() });
}, 1000);

setInterval(() => {
  sendData("N", "AA:BB:CC:11:22:33", "Roba");
}, 2000);
