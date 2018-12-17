import { DeviceState } from "../interfaces/DeviceState";
import { DeviceType } from "../interfaces/DeviceType";
import IDevice from "../interfaces/IDevice";

export function getall() {
  return [
    {
      type: DeviceType.Binary,
      id: 0x23
    },
    {
      type: DeviceType.Modulable,
      id: 0x32
    }
  ];
}

export async function getstate(id: number): Promise<IDevice> {
  return {
    devid: id,
    state: DeviceState.Busy
  };
}
