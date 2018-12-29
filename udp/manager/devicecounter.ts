import _ from "lodash";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent } from "../../config/bus";

export namespace DeviceCounter {
  const devices: IDevice[] = [];

  export function getAll(): Promise<IDevice[]> {
    return new Promise((resolve, reject) => {
      resolve(devices);
    });
  }

  export function findById(devId: number): Promise<IDevice> {
    return new Promise(resolve => {
      resolve(devices.find(dev => dev.devid === devId));
    });
  }

  export async function update(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) return;
    devices[index] = device;
  }

  SubscriveToEvent("device-state-change", async (device: IDevice) => {
    const dev = await findById(device.devid);
    if (!dev) throw Error("Unknown device!");
    await update(device);
  });
}

export default DeviceCounter;
