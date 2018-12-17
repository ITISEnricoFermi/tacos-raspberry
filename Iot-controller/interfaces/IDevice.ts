import { DeviceState } from "./DeviceState";

/**
 * Dispositivi di base
 */
export interface IDevice {
  devid: number;
  state: DeviceState;
}

export default IDevice;
