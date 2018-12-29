import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

/**
 * Caratteristiche che dovrà avere un dispositivo per venir considerato tale
 */
export interface IDevice {
  devid: number;
  mac: string;
  state: DeviceState;
  type: DeviceType;
}

export default IDevice;
