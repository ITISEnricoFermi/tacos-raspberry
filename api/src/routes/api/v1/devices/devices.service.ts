import {
  getall,
  getstate
} from "../../../../../../Iot-controller/mock/devices";
import { do_the_thing } from "../../../../../../Iot-controller/services/lights";
import { DeviceType } from "../../../../../../Iot-controller/interfaces/DeviceType";

const changeDeviceState = do_the_thing;

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
