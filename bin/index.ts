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
import DeviceType from "../Iot-controller/interfaces/DeviceType";
export { server };

const iface = createInterface(process.stdin, process.stdout);
iface.on("line", line => {
  if (line === "exit") process.exit(0);
  if (line.search(/rgb/)) {
    let lineArr: string[] = line.split(" ");
    let rgb: string = lineArr[1] || "ffffff";
    let r = rgb.substring(0, 2);
    let g = rgb.substring(2, 4);
    let b = rgb.substring(4, 6);
  }
  logger.debug(line);
  sendData(
    DeviceType.Lampadina,
    "AA:BB:CC:DD:EE:FF",
    `${line === "off" ? "false" : line === "on" ? "true" : ""}`
  );
});
