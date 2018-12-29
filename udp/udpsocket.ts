import { createSocket, Socket } from "dgram";
import { config } from "../config/conf";
import os, { NetworkInterfaceInfo } from "os";
const DEBUG = config.node_env === "development";

export namespace socketspace {
  const RecPORT: number = config.udp_rec_port;
  const DestPORT: number = config.udp_dest_port;
  let bcAddress: string;

  export const udpsocket: Socket = createSocket("udp4");

  udpsocket.on("close", () => {
    console.log("Socket closed.");
  });

  udpsocket.on("error", e => {
    if (!DEBUG) return console.log("Errore brutto nel socket udp!");
    console.log(e.message);
  });

  udpsocket.on("listening", () => {
    udpsocket.setBroadcast(true);
    console.log(`Socket listening for broadcast messages on port ${RecPORT}`);
  });

  udpsocket.on("message", m => {
    try {
      let data = JSON.parse(m.toString());
      switch (data.operation) {
        case "NEW":
          break;
        case "UPDATE":
          break;
        case "ALIVE":
          break;
      }
    } catch (e) {
      if (DEBUG) console.log("Error on message: " + e + "\n" + m);
    }
  });

  export function sendData(type: string, mac: string, payload: string) {
    let typeB: Buffer = Buffer.from(type);
    let macB: Buffer = Buffer.from(mac.replace(/:/g, ""), "hex");
    let payloadB: Buffer = Buffer.from(payload);
    let lenB: Buffer = Buffer.alloc(1);
    lenB.writeInt8(payloadB.length, 0);

    if (
      typeB.length > 1 ||
      macB.length > 6 ||
      lenB.length > 1 ||
      payloadB.length > 255
    )
      return Error("Invalid length for arguments");

    let message: Buffer = Buffer.concat([typeB, macB, lenB, payloadB]);
    udpsocket.send(message, DestPORT, bcAddress, err => {
      if (err) return console.log(err);
      if (DEBUG) {
        const jsonMessage = message.toJSON();
        console.log(
          `Sending to ${mac} [${DestPORT}] {${
            jsonMessage.type
          }} => ${JSON.stringify(jsonMessage.data.toString(), null, 2)}`
        );
      }
    });
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
        if (DEBUG) console.log("Broadcast address: " + bcAddress);
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
