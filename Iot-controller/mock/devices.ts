import { DeviceState } from "../interfaces/DeviceState";
import { DeviceType } from "../interfaces/DeviceType";

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

export async function getstate(id: number) {
  return {
    id: id,
    type: DeviceType.Binary,
    state: DeviceState.Busy
  };
}
