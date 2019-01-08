import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

export function createIDevice(device): IDevice {
  let newDevice: IDevice = {
    devid: device.devid,
    mac: device.mac,
    state: device.state,
    type: device.type
  };
  return newDevice;
}

/**
 * Caratteristiche che dovrà avere un dispositivo per venir considerato tale;
 * a seconda del type verranno aggiunte altre informazzioni al oggetto device
 */
export interface IDevice {
  devid: number;
  mac: string;
  state: DeviceState;
  type: DeviceType;
  [key: string]: any;
}

export default IDevice;
