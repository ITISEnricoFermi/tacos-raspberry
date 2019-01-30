import { DeviceState } from "./DeviceState";
import { DeviceType } from "./DeviceType";

export function createDevice(device: any): Device {
  let newDevice: Device = new Device(
    device.id,
    device.mac,
    device.state,
    device.type
  );
  return newDevice;
}

/**
 * Caratteristiche che dovrà avere un dispositivo per venir considerato tale;
 * a seconda del type verranno aggiunte altre informazzioni al oggetto device
 */
export interface IDevice {
  id: number;
  mac: string;
  state: {
    name: string;
    code: DeviceState;
  };
  type: {
    name: string;
    code: DeviceType;
  };
  [key: string]: any;
}

export class Device implements IDevice {
  constructor(
    public id: number = Date.now(),
    public mac: string,
    state: DeviceState = DeviceState.Unknown,
    type: DeviceType = DeviceType.None
  ) {
    //@ts-ignore
    if (isNaN(state)) state = state.code;
    //@ts-ignore
    if (isNaN(type)) type = type.code;

    this._state = state;
    this._type = type;
  }

  set _state(s: DeviceState) {
    this.state = {
      name: DeviceState[s],
      code: s
    };
  }

  get _type() {
    return this.type.code;
  }

  get _state() {
    return this.state.code;
  }

  set _type(t: DeviceType) {
    this.type = {
      name: DeviceType[t],
      code: t
    };
  }

  public state: { name: string; code: DeviceState };
  public type: { name: string; code: DeviceType };
  [key: string]: any;
}

export default Device;
