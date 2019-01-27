import { DeviceType } from "../../../../../Iot-controller/interfaces/DeviceType";
import { DeviceManager } from "../../../../../udp/manager/devices";
import { PushEvent } from "../../../../../config/bus";
import {
  IDevice,
  createIDevice
} from "../../../../../Iot-controller/interfaces/IDevice";
import DeviceState from "../../../../../Iot-controller/interfaces/DeviceState";

/**
 * Funzione wrapper attorno alla funzione findById nel namespace DeviceManager
 * @see {@link DeviceManager}
 * @param id Id del dispositivo da trovare
 */
const findDeviceById: (id: number) => any = (id: number) => {
  return DeviceManager.findById(id);
};

/**
 * Cambia lo stato di un dispositivo
 * @throws {Error} se non riesce a cambiarne lo stato
 * @param id Id del dispositivo da aggiornare
 * @param state nuovo stato del dispositivo
 */
const changeDeviceState = async (
  id: number,
  state: string
): Promise<IDevice> => {
  let device = createIDevice(await findDeviceById(id));
  PushEvent("change-state", device, state);
  device.state = DeviceState.Busy;
  return device;
};

/**
 * Funzione wrapper attorno alla funzione getAll nel namespace DeviceManager
 * @returns {Promise<IDevice[]>}
 */
const getAllActiveDevices = async () => await DeviceManager.getAll();

/**
 * Cerca un dispositivo e ne restituisce lo stato in quel momento
 * @param id Id del dispositivo da trovare
 * @returns {DeviceState}
 */
const getDeviceState = async (id: number) => {
  let dev = await DeviceManager.findById(id);
  return dev.state;
};

export {
  changeDeviceState,
  DeviceType,
  getAllActiveDevices,
  getDeviceState,
  findDeviceById
};
