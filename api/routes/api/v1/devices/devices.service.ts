import { do_the_thing } from "../../../../../Iot-controller/services/lights";
import { DeviceType } from "../../../../../Iot-controller/interfaces/DeviceType";
import { DeviceCounter } from "../../../../../udp/manager/devicecounter";

/**
 * Funzione wrapper attorno alla funzione findById nel namespace DeviceCounter
 * @see {@link DeviceCounter}
 * @param devid Id del dispositivo da trovare
 */
const findDeviceById: (devid: number) => any = async (devid: number) => {
  return DeviceCounter.findById(devid);
};

/**
 * Cambia lo stato di un dispositivo
 * @throws {Error} se non riesce a cambiarne lo stato
 * @param id Id del dispositivo da aggiornare
 * @param state nuovo stato del dispositivo
 */
const changeDeviceState = async (id: number, state: number): Promise<void> => {
  let device = await findDeviceById(id);

  let r = do_the_thing(device.devid, state);
  if (!r) throw Error("Non riesco a cambiare lo stato del dispositivo");
};

/**
 * Funzione wrapper attorno alla funzione getAll nel namespace DeviceCounter
 * @returns {Promise<IDevice[]>}
 */
const getAllActiveDevices = async () => await DeviceCounter.getAll();

/**
 * Cerca un dispositivo e ne restituisce lo stato in quel momento
 * @param devid Id del dispositivo da trovare
 * @returns {DeviceState}
 */
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
