import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent, PushEvent } from "../../config/bus";
import DeviceState from "../../Iot-controller/interfaces/DeviceState";
import { getLogger } from "../../config/log";
const logger = getLogger("DEVICECOUNTER");

const TIMEOUT = config.devices_timeout;
/**
 * DeviceCounter namespace contiene le funzioni e la lista di tutti i dispositivi attualmente attivi
 */
export namespace DeviceCounter {
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
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index > -1) throw Error("Device already exists");
    devices.push(device);
    devicesTimeout.push(setTimeout(remove, TIMEOUT, device));
    logger.info("- New Device: " + JSON.stringify(device.devid));
  }

  /**
   * Azzera il timer della rimozione del dispositivo dalla lista qualora sia presente
   * @throws {Error} - Device not found
   * @returns {void}
   */
  export function alive(device: IDevice): void {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) throw Error("Device not found");
    clearTimeout(devicesTimeout[index]);
    devicesTimeout[index] = setTimeout(remove, TIMEOUT, device);
    logger.silly(`- Device alive: (${device.devid})[${device.mac}]`);
  }

  /**
   * Rimuove il dispositivo dalla lista qualora sia presente
   * @throws {Error} - Device not found
   * @returns {void}
   */
  export function remove(device: IDevice): void {
    device.state = DeviceState.Disconnected;
    PushEvent("device-state-changed", device);
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) throw Error("Device not found");
    devices.splice(index, 1);
    devicesTimeout.splice(index, 1);
    logger.silly(`- Removed Device: (${device.devid})[${device.mac}]`);
  }

  /**
   * Richiede la lista dei dispositivi attualmente attivi
   * @returns {Promise<IDevice>} tutti i dispositivi
   */
  export async function getAll(): Promise<IDevice[]> {
    return devices;
  }

  /**
   * Cerca un dispositivo nella lista dispositivi
   * @param devId Id di un dispositivo
   * @returns {Promise<IDevice>} un dispositivo o un errore nel caso il dispositivo non venga trovato
   */
  export function findById(devId: number): IDevice {
    const device = devices.find(dev => dev.devid === devId);

    if (device) return device;

    throw Error("No device found");
  }

  /**
   * Aggiorna un dispositivo nella lista di dispositivi attivi
   * o ritorna un errore se il dispositivo non è presente nella lista
   * @param device Dispositivo da aggiornare
   */
  export function update(device: IDevice): void {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) throw Error("Device not found");
    devices[index] = device;
    PushEvent("device-state-changed", device);
    logger.silly(`- Updated Device: (${device.devid})[${device.mac}]`);
  }

  /**
   * Iscrizione al evento device-state-change e modifica del dispositivo corrispondente nella lista dei dispositivi
   */
  SubscriveToEvent("device-update", async (device: IDevice) => {
    try {
      const dev = await findById(device.devid);
      alive(device);
      if (dev !== device) {
        await update(device);
      }
    } catch (e) {
      logger.error(
        `Unknown device in device-update! [{id: ${device.devid}, mac:${
          device.mac
        }, ...}]`
      );
    }
  });

  /**
   * Iscrizione al evento device-new e aggiunta del dispositivo alla lista se non presente
   */
  SubscriveToEvent("device-new", (device: IDevice) => {
    create(device);
  });

  SubscriveToEvent("device-alive", (device: IDevice) => {
    try {
      alive(device);
    } catch (err) {
      PushEvent("device-new", device);
      logger.warn(err);
    }
  });
}

export default DeviceCounter;
