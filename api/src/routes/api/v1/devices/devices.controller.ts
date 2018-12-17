//@ts-check
import _ from "lodash";
import { DeviceType, do_the_thing, getall, getstate } from "./devices.service";

export async function getDevices(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: await getall()
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function getDevice(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: await getstate(req.params.id)
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function changeState(req: any, res: any) {
  let device;

  try {
    device = await getstate(req.params.id);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      result: "Device not found"
    });
  }

  if (device.type === DeviceType.Binary) {
    const r = await do_the_thing(device.id, parseInt(req.params.state, 10));
    res.status(r ? 200 : 500).json({
      state: r ? 200 : 500,
      message: r ? "Ok" : "Error"
    });
  }
}

function handleInternalError(res: any, e: any) {
  res.status(500).json({
    status: 500,
    message: res.app.get("env") === "development" ? e.message : ""
  });
}
