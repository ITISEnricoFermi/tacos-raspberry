/**
 * Entry point del server
 */
// Compila gli import e mette in cache per import più performanti
import "v8-compile-cache";

import { createInterface } from "readline";

import { getLogger } from "../config/log";
const logger = getLogger("MAIN");

logger.verbose("Setup udp socket");
import { sendData } from "../udp/socket";
export { sendData };
import { UdpEvents } from "../udp/events";
export { UdpEvents };

logger.verbose("Setup API e Socket.io");
import { server } from "../api/server";
import { CommandEnum } from "../Iot-controller/interfaces/Commands";
import DeviceManager from "../udp/manager/devices";
export { server };

const iface = createInterface(process.stdin, process.stdout);
iface.on("line", line => {
  logger.debug(line);
  if (line === "exit") process.exit(0);
  sendData(
    CommandEnum.Lampadina,
    DeviceManager.getAll()[0],
    line === "on" ? "true" : "false"
  );
});
