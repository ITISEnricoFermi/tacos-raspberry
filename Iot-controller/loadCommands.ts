import { readdir } from "fs";
import { Socket } from "dgram";
import { resolve, sep } from "path";
import { getLogger } from "../config/log";
import Device from "./interfaces/Device";
const logger = getLogger("COMMAND-LOADER");
export interface Command {
  run: (
    socket: Socket,
    dest_port: number,
    bc_address: string,
    device: Device,
    ...splat: any[]
  ) => void;
}

export interface Commands {
  [key: string]: Command;
}

let cmds: Commands = {};

const commands_folder = resolve(__dirname, "commands");

export const load = () => {
  readdir(commands_folder, (err, files) => {
    if (err) return logger.error(err);
    files.forEach(f => {
      try {
        let cmd = require(commands_folder + sep + f);
        let name = f.slice(0, -3);
        cmds[name] = { run: cmd.run };
      } catch (err) {
        logger.error(err);
      }
    });
  });
};

export const reload = (cmd: string) => {
  try {
    require(commands_folder + sep + cmd);
    delete require.cache[require.resolve(commands_folder + sep + cmd)];
    let good = require(commands_folder + sep + cmd);
    cmds[cmd] = { run: good.run };
    return { worked: true };
  } catch (err) {
    delete cmds[cmd];
    return { worked: false, error: err };
  }
};

export const getCmds: (() => Commands) = () => {
  return cmds;
};
