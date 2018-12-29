/**
 * Entry point del server
 */

// Setup event bus e mongoose
import { PushEvent } from "../config/bus";

// Setup udp socket
import { sendData } from "../udp/udpsocket";
import { IDevice, createIDevice } from "../Iot-controller/interfaces/IDevice";

// Setup API
import { server } from "../api/server";
export { server };

// testing some things
const device: IDevice = createIDevice({
  devid: 57,
  mac: "AA:BB:CC:00:22:33",
  state: "ON",
  type: "A"
});

PushEvent("new-device", device);

setInterval(() => {
  PushEvent("update-device", device);
}, 10000);

setInterval(() => {
  PushEvent("device-alive", device);
}, 5000);

setInterval(() => {
  sendData("N", "AA:BB:CC:11:22:33", "Roba");
}, 5000);
