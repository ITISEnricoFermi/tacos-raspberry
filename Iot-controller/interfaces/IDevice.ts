import { DeviceState } from "./DeviceState";

/**
 * Dispositivi di base
 */
export interface IDevice {
  id: number;
  state: DeviceState;
}

export default IDevice;
