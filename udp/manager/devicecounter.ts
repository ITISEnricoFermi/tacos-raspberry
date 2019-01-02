import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent, PushEvent } from "../../config/bus";
import DeviceState from "../../Iot-controller/interfaces/DeviceState";

const DEBUG = config.node_env === "development";
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
  }

  /**
   * Richiede la lista dei dispositivi attualmente attivi
   * @returns {Promise<IDevice>} tutti i dispositivi
   */
  export function getAll(): Promise<IDevice[]> {
    return new Promise(resolve => {
      resolve(devices);
    });
  }

  /**
   * Cerca un dispositivo nella lista dispositivi
   * @param devId Id di un dispositivo
   * @returns {Promise<IDevice>} un dispositivo o un errore nel caso il dispositivo non venga trovato
   */
  export function findById(devId: number): Promise<IDevice> {
    return new Promise((resolve, reject) => {
      const device = devices.find(dev => dev.devid === devId);
      if (device) return resolve(device);
      reject(Error("No device found"));
    });
  }

  /**
   * Aggiorna un dispositivo nella lista di dispositivi attivi
   * o ritorna un errore se il dispositivo non è presente nella lista
   * @param device Dispositivo da aggiornare
   */
  export function update(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) throw Error("Device not found");
    devices[index] = device;
    PushEvent("device-state-changed", device);
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
        if (DEBUG) {
          console.log(
            `- Updated Device (also alive): (${device.devid})[${device.mac}]`
          );
        }
      }
    } catch (e) {
      if (DEBUG) {
        console.error(
          `Unknown device in device-update! [{id: ${device.devid}, mac:${
            device.mac
          }, ...}]`
        );
      }
    }
  });

  /**
   * Iscrizione al evento device-new e aggiunta del dispositivo alla lista se non presente
   */
  SubscriveToEvent("device-new", (device: IDevice) => {
    // Clona il device altrimenti non funziona l'aggiornamento durante i test (per "più" informazioni vedere il messaggio di commit)
    create(device);
    console.log("- New Device: " + JSON.stringify(device.devid));
  });

  SubscriveToEvent("device-alive", (device: IDevice) => {
    try {
      alive(device);
      process.stdout.write(
        " ".repeat(90) +
          "\r" +
          "- Device Alive: " +
          JSON.stringify(device.devid) +
          "\r"
      );
    } catch (err) {
      PushEvent("device-new", device);
      if (DEBUG) {
        console.error(err);
      }
    }
  });
}

export default DeviceCounter;
