/**
 * Entry point del server
 */
// Compila gli import e mette in cache per import più performanti
import "v8-compile-cache";

import { getLogger } from "../config/log";
const logger = getLogger("MAIN");

logger.verbose("Setup event bus e gestione dei dispositivi");

logger.verbose("Setup udp socket");
import { sendData } from "../udp/socket";
export { sendData };
import { UdpEvents } from "../udp/events";
export { UdpEvents };

logger.verbose("Setup API e Socket.io");
import { server } from "../api/server";
export { server };

logger.verbose("testing some things");

// Test send data sulla raspberry pi
sendData(1, "AA:BB:CC:00:22:33", "true");
setInterval(() => sendData(1, "AA:BB:CC:00:22:33", "true"), 10000);
