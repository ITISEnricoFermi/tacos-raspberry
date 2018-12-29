import _ from "lodash";
import { config } from "../../config/conf";
import { IDevice } from "../../Iot-controller/interfaces/IDevice";
import { SubscriveToEvent, PushEvent } from "../../config/bus";

const DEBUG = config.node_env === "development";
export namespace DeviceCounter {
  const devices: IDevice[] = [];
  const devicesTimeout: Timeout[] = [];

  export function create(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index > -1) return Error("Device already exists");
    devices.push(device);
    devicesTimeout.push(setTimeout(remove, 10000, device));
  }

  export function alive(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) return Error("Device not found");
    clearTimeout(devicesTimeout[index]);
    devicesTimeout[index] = setTimeout(remove, 10000, device);
  }

  export function remove(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) return Error("Device not found");
    devices.splice(index, 1);
    devicesTimeout.splice(index, 1);
  }

  export function getAll(): Promise<IDevice[]> {
    return new Promise((resolve, reject) => {
      resolve(devices);
    });
  }

  export function findById(devId: number): Promise<IDevice> {
    return new Promise((resolve, reject) => {
      const index = devices.find(dev => dev.devid === devId);
      if (!index) return reject(Error("Device not found"));
      resolve(index);
    });
  }

  export function update(device: IDevice) {
    const index = devices.findIndex(dev => dev.devid === device.devid);
    if (index === -1) return Error("Device not found");
    devices[index] = device;
  }

  SubscriveToEvent("update-device", async (device: IDevice) => {
    const dev = await findById(device.devid);
    if (!dev) {
      if (DEBUG) {
        console.error(
          `Unknown device in update-device! [{id: ${device.devid}, mac:${
            device.mac
          }, ...}]`
        );
      }
      return;
    }
    if (dev === device) {
      console.log("- Updated Device (also alive): " + device);
      update(device);
      alive(device);
      PushEvent("device-state-changed", device);
    }
  });

  SubscriveToEvent("new-device", (device: IDevice) => {
    console.log("- New Device: " + device);
    create(device);
  });

  SubscriveToEvent("device-alive", (device: IDevice) => {
    console.log("- Device Alive: " + device);
    alive(device);
  });
}

export default DeviceCounter;
