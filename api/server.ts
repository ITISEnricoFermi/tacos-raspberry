import socketIO from "socket.io";
import { SubscriveToEvent } from "../config/bus";
import DeviceManager from "../udp/manager/devices";
import { IDevice } from "../Iot-controller/interfaces/IDevice";

import { server } from "./httpserver";
import { config } from "../config/conf";
import { getLogger } from "../config/log";
import { normalizePort } from "./utils/utils";
const logger = getLogger("SOCKET.IO");

const port = normalizePort(config.server_port);

export const io: SocketIO.Server = socketIO(server, { serveClient: true });
export { server };
export default io;

// Socket io stuff
SubscriveToEvent("device-state-changed", (dev: IDevice) => {
  io.sockets.emit("device-state-changed", dev);
});

SubscriveToEvent("device-new", async (dev: IDevice) => {
  io.sockets.emit("device-new", dev);
});

io.on("connection", async socket => {
  // Invia tutti i dispositivi attualmente connessi al nuovo client connesso
  socket.emit("READY", await DeviceManager.getAll());

  socket.on("--", (dev: IDevice) => {
    logger.debug(`Ricevuto device ${JSON.stringify(dev)}`);
  });

  socket.on("disconnecting", reason => {
    logger.debug(`Il socket si sta disconnettendo per: ${reason}`);
  });
});

server.listen(port);
