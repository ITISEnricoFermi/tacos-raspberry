/**
 * Entry point del server
 */
// Compila gli import e mette in cache per import più performanti
import "v8-compile-cache";

import { getLogger } from "../config/log";
const logger = getLogger("MAIN");

logger.verbose("Setup event bus e gestione dei dispositivi");
import { PushEvent } from "../config/bus";

logger.verbose("Setup udp socket");
import { sendData } from "../udp/udpsocket";
import { IDevice, createIDevice } from "../Iot-controller/interfaces/IDevice";
export { sendData };

logger.verbose("Setup API e Socket.io");
import { server } from "../api/server";
export { server };

logger.verbose("testing some things");
import { mock_devices } from "../Iot-controller/mock/devices";

mock_devices().forEach(async dev => {
  PushEvent("device-new", dev);
  setInterval(() => {
    PushEvent("device-alive", dev);
  }, 5000 + Math.random() * 1000);
});

let device: IDevice = createIDevice({
  devid: 57,
  mac: "AA:BB:CC:00:22:33",
  state: 2,
  type: 0
});

PushEvent("device-new", device);

setInterval(async () => {
  // Clona il device altrimenti non funziona l'aggiornamento durante i test (per "più" informazioni vedere il messaggio di commit)
  let newdevice = await createIDevice(device);
  newdevice.state = Math.ceil(Math.random() * 10);
  PushEvent("device-update", newdevice);
  device = newdevice;
}, 10000);

setInterval(async () => {
  PushEvent("device-alive", device);
}, 5000);

// Test send data sulla raspberry pi
sendData("1", "AA:BB:CC:00:22:33", JSON.stringify({ h: 1 }));
setInterval(
  async () => sendData("6", "AA:BB:CC:00:22:33", JSON.stringify(device)),
  10000
);
