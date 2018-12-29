import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent, PushEvent } from "../../config/bus";

const DEBUG = config.node_env === "development";
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

  SubscriveToEvent("device-state-change", async (device: IDevice) => {
    const dev = await findById(device.devid);
    if (!dev && DEBUG)
      return console.error(
        `Unknown device in device-state-change! [{id: ${device.devid}, mac:${
          device.mac
        }, ...}]`
      );
    await update(device);
  });
}

export default DeviceCounter;
