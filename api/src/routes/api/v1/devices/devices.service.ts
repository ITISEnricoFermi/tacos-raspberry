import {
  getall,
  getstate
} from "../../../../../../Iot-controller/mock/devices";
import { do_the_thing } from "../../../../../../Iot-controller/services/lights";
import { DeviceType } from "../../../../../../Iot-controller/interfaces/DeviceType";
import IDevice from "../../../../../../Iot-controller/interfaces/IDevice";

const changeDeviceState = async (id: number, state: number) => {
  let device: IDevice;
  try {
    device = await findDeviceById(id);
  } catch (e) {
    e.code = 404;
    throw e;
  }

  const r = await do_the_thing(device.devid, state);
  if (!r) throw Error("Non sono riuscirto a cambiare lo stato del device");
};

const getAllActiveDevices = getall;

const findDeviceById = getstate;

const getDeviceState = async (devid: number) => {
  let dev = await findDeviceById(devid);
  return dev.state;
};

export {
  changeDeviceState,
  DeviceType,
  getAllActiveDevices,
  getDeviceState,
  findDeviceById
};
