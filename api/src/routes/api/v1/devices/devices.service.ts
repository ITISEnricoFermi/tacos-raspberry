import { do_the_thing } from "../../../../../../Iot-controller/services/lights";
import { DeviceType } from "../../../../../../Iot-controller/interfaces/DeviceType";
import { Device, IDeviceModel } from "../../../../models/device";

// FIXME: DA SPOSTARE NEL DEVICE MODEL
const findDeviceById: (devid: number) => Promise<IDeviceModel> = async (
  devid: number
) => {
  const device = await Device.findOne({ devid }).then(
    (device: IDeviceModel) => device
  );

  if (device) return device;

  let e = Error("Device not found!");
  //@ts-ignore
  e.code = 404;
  throw e;
};

const changeDeviceState = async (id: number, state: number): Promise<void> => {
  let device: IDeviceModel = await findDeviceById(id);

  let r = do_the_thing(device.devid, state);
  if (!r) throw Error("Non riesco a cambiare lo stato del dispositivo");
};

const getAllActiveDevices = async () => await Device.find({});

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
