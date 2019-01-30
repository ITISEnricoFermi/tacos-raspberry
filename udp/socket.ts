import { createSocket, Socket } from "dgram";
import { config } from "../config/conf";
import { PushEvent } from "../config/bus";
import Device, { createDevice } from "../Iot-controller/interfaces/Device";
import { load, getCmds, Commands } from "../Iot-controller/loadCommands";
import { CommandEnum } from "../Iot-controller/interfaces/Commands";
import os, { NetworkInterfaceInfo } from "os";
import { getLogger } from "../config/log";
const logger = getLogger("UDPSOCKET");

export interface Payload {
  rgb: number;
  state: number; // 1 or 0
  rgbmode: number;
}

export namespace socketspace {
  load();
  const RecPORT: number = config.udp_rec_port;
  const DestPORT: number = config.udp_dest_port;
  let bcAddress: string | null = config.broadcast_address;

  export const udpsocket: Socket = createSocket("udp4");

  udpsocket.on("close", () => {
    logger.info("Socket closed.");
  });

  udpsocket.on("error", e => {
    logger.error(e);
  });

  udpsocket.on("listening", () => {
    udpsocket.setBroadcast(true);
    logger.verbose(
      `Socket listening for broadcast messages on port ${RecPORT}`
    );
  });

  udpsocket.on("message", m => {
    try {
      let data = JSON.parse(m.toString());
      let device: Device = createDevice(data);
      PushEvent("device-message", device);
    } catch (e) {
      logger.warn("Error on message: " + e + "\n" + m);
    }
  });

  export function sendData(cmd: CommandEnum, device: Device, ...args: any[]) {
    const cmds: Commands = getCmds();
    if (!bcAddress) throw new Error("Broadcast address undefined");
    try {
      cmds[CommandEnum[cmd]].run(
        udpsocket,
        DestPORT,
        bcAddress,
        device,
        ...args
      );
    } catch (err) {
      logger.warn(
        `Cannot execute command [${CommandEnum[cmd]}]: ${err.message}`
      );
    }
  }

  export function calculateBroadcast() {
    let ifaces: {
      [index: string]: NetworkInterfaceInfo[];
    } = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(ifname) {
      ifaces[ifname].forEach(function(iface) {
        if (bcAddress) return;
        if ("IPv4" !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        let address: string[] = iface.address.split(".");
        let netmask: string[] = iface.netmask.split(".");
        let broadcast: string[] = [];
        for (let i = 0; i < 4; i++) {
          let byteAddress: string = Number(address[i]).toString(2);
          let byteNetMask: string = Number(netmask[i]).toString(2);
          let notbyteNetMask: string[] = [];
          //invert
          if (byteNetMask.length < 8) {
            for (let j = 0; j < 8 - byteNetMask.length; j++) {
              notbyteNetMask.push("1");
            }
          }
          for (let j = 0; j < byteNetMask.length; j++) {
            notbyteNetMask.push(
              byteNetMask[j] == "0" || byteNetMask[j] == "0" ? "1" : "0"
            );
          }
          let byteBroadcast: number;
          byteBroadcast =
            parseInt(byteAddress, 2) | parseInt(notbyteNetMask.join(""), 2);
          broadcast.push(byteBroadcast.toString());
        }
        bcAddress = broadcast.join(".");
        logger.verbose("Broadcast address: " + bcAddress);
      });
    });
  }
  calculateBroadcast();
  udpsocket.bind(RecPORT);
}

import sendData = socketspace.sendData;
import calculateBroadcast = socketspace.calculateBroadcast;

export { sendData, calculateBroadcast };

export default socketspace;
