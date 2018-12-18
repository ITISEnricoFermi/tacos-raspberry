import { DeviceState } from "./DeviceState";

/**
 * Dispositivi di base
 */
export interface IDevice {
  devid: number;
  mac: string;
  state: DeviceState;
}

export default IDevice;
