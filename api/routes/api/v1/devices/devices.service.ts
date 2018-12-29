import { do_the_thing } from "../../../../../Iot-controller/services/lights";
import { DeviceType } from "../../../../../Iot-controller/interfaces/DeviceType";
import { DeviceCounter } from "../../../../../udp/manager/devicecounter";

const findDeviceById: (devid: number) => any = async (devid: number) => {
  return DeviceCounter.findById(devid);
};

const changeDeviceState = async (id: number, state: number): Promise<void> => {
  let device = await findDeviceById(id);

  let r = do_the_thing(device.devid, state);
  if (!r) throw Error("Non riesco a cambiare lo stato del dispositivo");
};

const getAllActiveDevices = async () => await DeviceCounter.getAll();

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
