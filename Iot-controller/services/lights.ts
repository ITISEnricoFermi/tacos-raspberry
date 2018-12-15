import { DeviceState } from "../interfaces/DeviceState";
import srvc from "../mock/statechange";

export function do_the_thing(devid: number, state: DeviceState) {
  if (state === DeviceState.On) {
    return srvc.send(devid, DeviceState.On);
  }
  if (state === DeviceState.Off) {
    return srvc.send(devid, DeviceState.Off);
  }
}
