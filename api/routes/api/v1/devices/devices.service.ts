import { DeviceType } from "../../../../../Iot-controller/interfaces/DeviceType";
import { DeviceManager } from "../../../../../udp/manager/devices";
import { PushEvent } from "../../../../../config/bus";
import {
  IDevice,
  createDevice
} from "../../../../../Iot-controller/interfaces/Device";
import DeviceState from "../../../../../Iot-controller/interfaces/DeviceState";

/**
 * Funzione wrapper attorno alla funzione findById nel namespace DeviceManager
 * @see {@link DeviceManager}
 * @param id Id del dispositivo da trovare
 */
export const findDeviceById: (id: number) => any = (id: number) => {
  return DeviceManager.findById(id);
};

/**
 * Cambia lo stato di un dispositivo
 * @throws {Error} se non riesce a cambiarne lo stato
 * @param id Id del dispositivo da aggiornare
 * @param state nuovo stato del dispositivo
 */
export const changeDeviceState = async (
  id: number,
  state: string
): Promise<IDevice> => {
  return changeDevice("state", id, state);
};

/**
 * Cambia lo stato di un dispositivo
 * @throws {Error} se non riesce a cambiarne lo stato
 * @param id Id del dispositivo da aggiornare
 * @param state nuovo stato del dispositivo
 */
export const changeDeviceColor = async (
  id: number,
  color: string
): Promise<IDevice> => {
  return changeDevice("color", id, color);
};

/**
 * Funzione wrapper attorno alla funzione getAll nel namespace DeviceManager
 * @returns {Promise<IDevice[]>}
 */
export const getAllActiveDevices = async () => await DeviceManager.getAll();

/**
 * Cerca un dispositivo e ne restituisce lo stato in quel momento
 * @param id Id del dispositivo da trovare
 * @returns {DeviceState}
 */
export const getDeviceState = async (id: number) => {
  let dev = await DeviceManager.findById(id);
  return dev._state;
};

export { DeviceType };

async function changeDevice(event: string, id: number, ...args) {
  let device = createDevice(await findDeviceById(id));
  PushEvent(`change-${event}`, device, ...args);
  device._state = DeviceState.Busy;
  return device;
}
