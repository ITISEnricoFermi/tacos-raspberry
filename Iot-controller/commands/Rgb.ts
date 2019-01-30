import { Socket } from "dgram";
import { getLogger } from "../../config/log";
import Device from "../interfaces/Device";

//@ts-ignore
import { CommandEnum } from "../interfaces/Commands";
//@ts-ignore
const logger = getLogger("CMD-Rgb");

export const run = (
  socket: Socket,
  dest_port: number,
  bc_address: string,
  device: Device,
  ...splat: any[]
) => {
  const [color] = splat;
  logger.info(`Send color ${color} to device [${device.mac}]`);
};

export default run;
