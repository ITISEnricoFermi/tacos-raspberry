/**
 * Entry point del server
 */

// Setup event bus e mongoose

import { EventBus } from "../api/src/config/bus";
//import { mongoose } from "../api/src/config/db";
//export { EventBus, mongoose };

// Setup API
import { server } from "../api/server";
export { server };

import { udpsocket } from "../udp/udpsocket";
export { udpsocket };

setInterval(() => {
  EventBus.emit("device-state-change", { id: Math.random() });
}, 1000);

// Dgram socket listener
