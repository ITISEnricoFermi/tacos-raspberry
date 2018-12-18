import { Schema, Document, model, Model } from "mongoose";
import IDevice from "../../../Iot-controller/interfaces/IDevice";
import { DeviceState } from "../../../Iot-controller/interfaces/DeviceState";
import { DeviceType } from "../../../Iot-controller/interfaces/DeviceType";

export interface IDeviceModel extends IDevice, Document {
  type: DeviceType;
  changeState(newState: DeviceState): Promise<void>;
}

const DeviceSchema: Schema = new Schema({
  devid: {
    type: Number,
    required: true
  },
  mac: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    required: true
  },
  type: {
    type: Number,
    required: true,
    default: DeviceType.None
  }
});

DeviceSchema.method("changeState", async function(
  newState: DeviceState
): Promise<void> {
  const dev: IDeviceModel = this;
  return await dev.update({
    state: newState
  });
});

DeviceSchema.static("findByDeviceID", function(
  devid: number
): Promise<IDeviceModel> {
  const Device = this;
  return Device.findOne({
    devid
  });
});

DeviceSchema.static("findByDeviceMac", function(
  devmac: string
): Promise<IDeviceModel> {
  const Device = this;
  return Device.findOne({
    devmac
  });
});

export const Device: Model<IDeviceModel> = model<IDeviceModel>(
  "Device",
  DeviceSchema
);
export default Device;
