import { IDevice } from "./IDevice";

export interface IDBinary extends IDevice {
  on(): Promise<boolean>;
  off(): Promise<boolean>;
}

export default IDBinary;
