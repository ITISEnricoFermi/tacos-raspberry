import { DeviceState } from "../interfaces/DeviceState";
import { DeviceType } from "../interfaces/DeviceType";
import IDevice from "../interfaces/IDevice";

export function mock_devices(): IDevice[] {
  return [
    {
      devid: 0x23,
      mac: "00:ff:ff:ff",
      type: DeviceType.Lampadina,
      state: DeviceState.Ok
    },
    {
      devid: 0x32,
      mac: "00:2f:ff:ff",
      type: DeviceType.None,
      state: DeviceState.Unknown
    },
    {
      devid: 0x12,
      mac: "00:ff:f2:ff",
      type: DeviceType.Lampadina,
      state: DeviceState.Ok
    },
    {
      devid: 0x2,
      mac: "00:ff:ff:fa",
      type: DeviceType.None,
      state: DeviceState.Unknown
    }
  ];
}
