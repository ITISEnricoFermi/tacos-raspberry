import { IDevice } from "./IDevice";

export interface IModulable extends IDevice {
  amt: number;

  up(): Promise<void>;
  down(): Promise<void>;
}

export default IModulable;
