import { SubscriveToEvent, PushEvent } from "../config/bus";
import { IDevice } from "../Iot-controller/interfaces/IDevice";
import { sendData } from "./socket";
import DeviceManager from "./manager/devices";
import { getLogger } from "../config/log";
const logger = getLogger("UDPEVENTS");

export namespace UdpEvents {
  /**
   * Iscrizione al evento change-state e manda al dispositivo il nuovo stato
   */
  SubscriveToEvent("change-state", (device: IDevice, state: string) => {
    sendData(device.type, device.mac, state);
  });

  /**
   * Iscrizione al evento device-message e crea l'evento corrispondente al messaggio
   */
  SubscriveToEvent("device-message", async (device: IDevice) => {
    try {
      await DeviceManager.findByMac(device.mac);
      PushEvent("device-alive", device);
    } catch (e) {
      PushEvent("device-new", device);
    }
  });

  /**
   * Iscrizione al evento device-new e crea un nuovo dispositivo nella lista
   */
  SubscriveToEvent("device-new", (device: IDevice) => {
    DeviceManager.create(device);
  });

  /**
   * Iscrizione al evento device-alive e azzera il timer di distruzione del dispositivo corrispondente nella lista dei dispositivi
   */
  SubscriveToEvent("device-alive", (device: IDevice) => {
    try {
      DeviceManager.alive(device);
    } catch (e) {
      logger.warn(e);
    }
  });
}

export default UdpEvents;
