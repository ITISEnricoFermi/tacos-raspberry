import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

export function createIDevice(device): IDevice {
  let newDevice: IDevice = {
    id: device.id,
    mac: device.mac,
    state: DeviceState.Unknown,
    type: {
      name: DeviceType[device.type ? device.type : DeviceType.Lampadina],
      code: device.type ? device.type : DeviceType.Lampadina
    }
  };
  return newDevice;
}

/**
 * Caratteristiche che dovrà avere un dispositivo per venir considerato tale;
 * a seconda del type verranno aggiunte altre informazzioni al oggetto device
 */
export interface IDevice {
  id: number;
  mac: string;
  state: DeviceState;
  type: {
    name: string;
    code: DeviceType;
  };
  [key: string]: any;
}

export default IDevice;
