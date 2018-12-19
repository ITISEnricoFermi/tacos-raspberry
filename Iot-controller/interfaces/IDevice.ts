import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

/**
 * Dispositivi di base
 */
export interface IDevice {
  devid: number;
  mac: string;
  state: DeviceState;
  type: DeviceType;
}

export default IDevice;
