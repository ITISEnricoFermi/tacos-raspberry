import { Socket } from "dgram";
import { getLogger } from "../../config/log";
import Device from "../interfaces/Device";

// Ricorda di aggiungerlo al commandenum con lo stesso nome del file
//@ts-ignore
import { CommandEnum } from "../interfaces/Commands";
//@ts-ignore
const logger = getLogger("CMD-<Nome del commando>");

export const run = (
  socket: Socket,
  dest_port: number,
  bc_address: string,
  device: Device,
  ...splat: any[]
) => {
  // Scrivi qui la logica del commando
};

export default run;
