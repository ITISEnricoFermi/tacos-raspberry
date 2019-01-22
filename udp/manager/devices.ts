import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { PushEvent } from "../../config/bus";
import DeviceState from "../../Iot-controller/interfaces/DeviceState";
import { getLogger } from "../../config/log";
const logger = getLogger("DEVICEMANAGER");

const TIMEOUT = config.devices_timeout;
/**
 * DeviceManager namespace contiene le funzioni e la lista di tutti i dispositivi attualmente attivi
 */
export namespace DeviceManager {
  /**
   * Lista di dispositivi attivi
   */
  const devices: IDevice[] = [];
  /**
   * Lista dei timeout per ogni dispositivo
   */
  const devicesTimeout: NodeJS.Timeout[] = [];

  /**
   * Crea il dispositivo e lo aggiunge alla lista qualora non sia presente
   * @throws {Error} - Device already exists
   * @returns {void}
   */
  export function create(device: IDevice): void {
    device.devid = Date.now();
    devices.push(device);
    const index = devices.findIndex(dev => dev.mac === device.mac);
    devicesTimeout.push(setTimeout(remove, TIMEOUT, index));
    logger.info("- New Device: " + JSON.stringify(device.devid));
  }

  /**
   * Azzera il timer della rimozione del dispositivo dalla lista qualora sia presente
   * @throws {Error} - Device not found
   * @returns {void}
   */
  export function alive(device: IDevice): void {
    const index = devices.findIndex(dev => dev.mac === device.mac);
    if (index === -1) throw Error("Device not found");

    //Se era disconnesso, settalo come attivo
    if (devices[index].state == DeviceState.Disconnected)
      devices[index].state = DeviceState.Ok;

    clearTimeout(devicesTimeout[index]);
    devicesTimeout[index] = setTimeout(remove, TIMEOUT, index);
    logger.debug(`- Device alive: [${device.mac}]`);
  }

  /**
   * Rimuove il dispositivo dalla lista qualora sia presente
   * @throws {Error} - Device not found
   * @returns {void}
   */
  export function remove(index: number): void {
    devices[index].state = DeviceState.Disconnected;
    let device = devices[index];
    PushEvent("device-state-changed", device);
    logger.info(`- Removed Device: (${device.devid})[${device.mac}]`);
  }

  /**
   * Richiede la lista dei dispositivi attualmente attivi
   * @returns {IDevice[]} tutti i dispositivi
   */
  export function getAll(): IDevice[] {
    return devices;
  }

  /**
   * Cerca un dispositivo nella lista dispositivi
   * @param id id di un dispositivo
   * @returns {IDevice} un dispositivo o un errore nel caso il dispositivo non venga trovato
   */
  export function findById(devid: number): IDevice {
    const device = devices.find(dev => dev.devid === devid);

    if (device) return device;

    throw Error("No device found");
  }

  /**
   * Cerca un dispositivo nella lista dispositivi
   * @param mac mac di un dispositivo
   * @returns {IDevice} un dispositivo o un errore nel caso il dispositivo non venga trovato
   */
  export function findByMac(mac: string): IDevice {
    const device = devices.find(dev => dev.mac === mac);

    if (device) return device;

    throw Error("No device found");
  }
}

export default DeviceManager;
