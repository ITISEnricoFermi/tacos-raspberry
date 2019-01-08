import IDevice from "../../Iot-controller/interfaces/IDevice";
import DeviceType from "../../Iot-controller/interfaces/DeviceType";
import DeviceState from "../../Iot-controller/interfaces/DeviceState";

/**
 * Normaliza (se possibile) una porta/pipe passatagli come stringa
 * @param {string} val Valore della porta da normalizare
 */
export function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export const toClientDev: (
  dev: IDevice
) => { devid: number; type: DeviceType; state: DeviceState } = (
  dev: IDevice
) => {
  return { devid: dev.devid, type: dev.type, state: dev.state };
};
