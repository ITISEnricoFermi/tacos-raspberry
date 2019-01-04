/**
 * Entry point del server
 */

// Setup event bus e gestione dei dispositivi
import { PushEvent, SubscriveToEvent } from "../config/bus";
import { DeviceCounter } from "../udp/manager/devicecounter";

// Setup udp socket
import { sendData } from "../udp/udpsocket";
import { IDevice, createIDevice } from "../Iot-controller/interfaces/IDevice";
export { sendData };

// Setup API
import { server, io } from "../api/server";
export { server };

// Socket io stuff
SubscriveToEvent("device-state-changed", (dev: IDevice) => {
  io.sockets.emit("device-state-changed", dev);
});

SubscriveToEvent("device-new", (dev: IDevice) => {
  io.sockets.emit("device-new", dev);
});

io.on("connection", async socket => {
  // Invia tutti i dispositivi attualmente connessi al nuovo client connesso
  const devs: IDevice[] = await DeviceCounter.getAll();
  socket.emit("READY", devs);
  socket.on("disconnecting", reason => {
    console.log("Il socket si sta disconnettendo per:", reason);
  });
});

// testing some things
import { mock_devices } from "../Iot-controller/mock/devices";

mock_devices().forEach(dev => {
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

setInterval(() => {
  // Clona il device altrimenti non funziona l'aggiornamento durante i test (per "più" informazioni vedere il messaggio di commit)
  let newdevice = createIDevice(device);
  newdevice.state = Math.ceil(Math.random() * 10);
  PushEvent("device-update", newdevice);
  device = newdevice;
}, 10000);

setInterval(() => {
  PushEvent("device-alive", device);
}, 5000);

// Test send data sulla raspberry pi
sendData("1", "AA:BB:CC:00:22:33", JSON.stringify({ h: 1 }));
setInterval(
  () => sendData("6", "AA:BB:CC:00:22:33", JSON.stringify(device)),
  10000
);
