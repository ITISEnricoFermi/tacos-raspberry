import { createSocket, Socket } from "dgram";

const RecPORT: number = 0xbeaf;
const DestPORT: number = 0xcafe;
const udpsocket: Socket = createSocket("udp4");

udpsocket.on("close", () => {
  console.log("Socket closed.");
});

udpsocket.on("error", e => {
  console.log(e.message);
});

udpsocket.on("listening", () => {
  udpsocket.setBroadcast(true);
  console.log(udpsocket.address());
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
    console.log("Error on message: " + e + "\n" + m);
  }
});

function sendData(type: string, mac: string, payload: string) {
  let typeB: Buffer = Buffer.from(type);
  let macB: Buffer = Buffer.from(mac.replace(/:/g, ""), "hex");
  let payloadB: Buffer = Buffer.from(payload);
  let lenB: Buffer = new Buffer(1);
  lenB.writeInt8(payloadB.length, 0);

  if (
    typeB.length > 1 ||
    macB.length > 6 ||
    lenB.length > 1 ||
    payloadB.length > 255
  )
    return Error("Invalid length for arguments");

  console.log("Sending...");
  let message: Buffer = Buffer.concat([typeB, macB, lenB, payloadB]);
  udpsocket.send(message, DestPORT, "255.255.255.255", err => {
    if (err) return console.log(err);
  });
}

udpsocket.bind(RecPORT);

setInterval(() => {
  sendData("N", "AA:BB:CC:11:22:33", "Roba");
}, 2000);

export { udpsocket, sendData };
