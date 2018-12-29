import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent, PushEvent } from "../../config/bus";

const DEBUG = config.node_env === "development";

/**
 * DeviceCounter namespace contiene le funzioni e la lista di tutti i dispositivi attualmente attivi
 */
export namespace DeviceCounter {
  /**
   * Lista di dispositivi attivi
   */
  const devices: IDevice[] = [];

  /**
   * Richiedi la lista dei dispositivi attualmente attivi
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
      reject("No device found");
    });
  }

  /**
   * Aggiorna un dispositivo nella lista di dispositivi attivi
   * o ritorna silenziosamente se il dispositivo non è presente nella lista
   * @param device Dispositivo da aggiornare
   */
  export async function update(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) return;
    devices[index] = device;
  }

  /**
   * Testa un dispositivo per cambiamenti, se ce ne sono emette un evento device-state-change e ritorna true
   * altrimenti ritorna false
   * @param device Disositivo da testare
   * @returns {Promise<boolean>}
   */
  export async function hasChanged(device: IDevice): Promise<boolean> {
    const dev = await findById(device.devid);
    if (!dev) {
      if (DEBUG) {
        console.error(`Unknown device! [${device.devid}]`);
      }
      return false;
    }
    if (dev === device) {
      PushEvent("device-state-change", device);
      return true;
    }
    return false;
  }

  /**
   * Iscrizione al evento device-state-change e modifica del dispositivo corrispondente nella lista dei dispositivi
   */
  SubscriveToEvent("device-state-change", async (device: IDevice) => {
    const dev = await findById(device.devid);
    if (!dev) {
      if (DEBUG) {
        console.error(
          `Unknown device in device-state-change! [{id: ${device.devid}, mac:${
            device.mac
          }, ...}]`
        );
      }
      return;
    }
    await update(device);
  });

  /**
   * Iscrizione al evento new-device e aggiunta del dispositivo alla lista se non presente
   */
  SubscriveToEvent("new-device", (device: IDevice) => {
    findById(device.devid)
      .then(d => Promise.resolve())
      .catch(e => devices.push(device));
  });

  SubscriveToEvent("device-alive", (device: IDevice) => {});
}

export default DeviceCounter;
