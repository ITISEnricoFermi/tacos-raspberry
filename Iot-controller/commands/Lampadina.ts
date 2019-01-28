import { Socket } from "dgram";
import { getLogger } from "../../config/log";
import Device from "../interfaces/Device";
import { CommandEnum } from "../interfaces/Commands";
const logger = getLogger("CMD-lampadina");

export const run = (
  socket: Socket,
  dest_port: number,
  bc_address: string,
  device: Device,
  ...splat: any[]
) => {
  const [st] = splat;

  logger.warn("Chiamato commando!");

  let typeB: Buffer = Buffer.alloc(1);
  typeB.writeInt8(CommandEnum.Lampadina, 0);
  let macB: Buffer = Buffer.from(device.mac.replace(/:/g, ""), "hex");
  let payloadB: Buffer = Buffer.alloc(1);
  payloadB.writeInt8(st === "false" ? 0 : 1, 0);
  let lenB: Buffer = Buffer.alloc(1);
  lenB.writeInt8(payloadB.length, 0);

  if (
    typeB.length > 1 ||
    macB.length > 6 ||
    lenB.length > 1 ||
    payloadB.length > 255
  )
    throw Error("Invalid length for arguments");

  let message: Buffer = Buffer.concat([typeB, macB, lenB, payloadB]);
  socket.send(message, dest_port, bc_address, err => {
    if (err) return logger.warn(err);
    logger.silly(
      `Sending to ${device.mac} [${dest_port}] {${message.toJSON().type}} => ${
        message.length > 20
          ? message.toString("hex").substring(0, 20)
          : message.toString("hex")
      }`
    );
  });
};

export default run;
