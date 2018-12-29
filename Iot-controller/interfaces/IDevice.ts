import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

/**
 * Dispositivi di base
 */

export function createIDevice(device) {
  let newDevice: IDevice = {
    devid: device.devid,
    mac: device.mac,
    state: device.state,
    type: device.type
  };
  return newDevice;
}

export interface IDevice {
  devid: number;
  mac: string;
  state: DeviceState;
  type: DeviceType;
}

export default IDevice;
