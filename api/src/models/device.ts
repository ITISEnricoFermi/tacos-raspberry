import { model, Schema, Model, Document, Query } from "mongoose";
import _ from "lodash";
import IDevice from "../../../Iot-controller/interfaces/IDevice";
import { DeviceState } from "../../../Iot-controller/interfaces/DeviceState";
import { DeviceType } from "../../../Iot-controller/interfaces/DeviceType";

export interface IDeviceModel extends IDevice, Document {
  changeState(newState: DeviceState): Promise<Query<IDeviceModel>>;
  toJSON(): IDevice;
}

export const DeviceSchema: Schema = new Schema({
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

DeviceSchema.method("toJSON", function(): IDevice {
  let device: IDeviceModel = this;
  let deviceObj = device.toObject();
  return _.pick(deviceObj, ["devid", "type", "mac", "state"]);
});

DeviceSchema.method("changeState", async function(
  newState: DeviceState
): Promise<Query<IDeviceModel>> {
  let dev: IDeviceModel = this;
  return await dev.update({
    state: newState
  });
});

export const Device: Model<IDeviceModel> = model<IDeviceModel>(
  "Device",
  DeviceSchema
);
export default Device;
