import { SubscriveToEvent, PushEvent } from "../config/bus";
import Device, { IDevice } from "../Iot-controller/interfaces/Device";
import { sendData } from "./socket";
import DeviceManager from "./manager/devices";
import { getLogger } from "../config/log";
const logger = getLogger("UDPEVENTS");

export namespace UdpEvents {
  /**
   * Iscrizione al evento change-state e manda al dispositivo il nuovo stato
   */
  SubscriveToEvent("change-state", (device: IDevice, state: string) => {
    if (!device.mac) device = DeviceManager.findById(device.id);
    if (!device) return;
    sendData(device._type.code, device.mac, state);
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
  SubscriveToEvent("device-new", (device: Device) => {
    DeviceManager.create(device);
  });

  /**
   * Iscrizione al evento device-alive e azzera il timer di distruzione del dispositivo corrispondente nella lista dei dispositivi
   */
  SubscriveToEvent("device-alive", (device: Device) => {
    try {
      DeviceManager.alive(device);
    } catch (e) {
      logger.warn(e);
    }
  });
}

export default UdpEvents;
