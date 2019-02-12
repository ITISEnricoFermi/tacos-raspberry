import { SubscriveToEvent, PushEvent } from "../config/bus";
import Device from "../Iot-controller/interfaces/Device";
import DeviceManager from "./manager/devices";
import { getLogger } from "../config/log";
import DeviceType from "../Iot-controller/interfaces/DeviceType";
import { sendData } from "./socket";
import { CommandEnum } from "../Iot-controller/interfaces/Commands";
const logger = getLogger("UDPEVENTS");

export namespace UdpEvents {
  /**
   * Iscrizione al evento change-state e manda al dispositivo il nuovo stato
   */
  SubscriveToEvent("change-state", (device: Device, state: string) => {
    if (!device.mac) device = DeviceManager.findById(device.id);
    if (!device) return;
    switch (device._type) {
      case DeviceType.Lampadina:
        sendData(CommandEnum.Lampadina, device, state);
        break;
      case DeviceType.LedRGB:
        sendData(CommandEnum.Rgb, device, state);
        break;
    }
  });

  /**
   * Iscrizione al evento change-color e manda al dispositivo il nuovo stato
   */
  SubscriveToEvent("change-color", (device: Device, color: string) => {
    if (!device.mac) device = DeviceManager.findById(device.id);
    if (!device) return;
    sendData(CommandEnum.Rgb, device, color);
  });

  /**
   * Iscrizione al evento device-message e crea l'evento corrispondente al messaggio
   */
  SubscriveToEvent("device-message", async (device: Device) => {
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
      logger.warn(`${e.message} ->->->\n ${e.stack}`);
    }
  });
}

export default UdpEvents;
