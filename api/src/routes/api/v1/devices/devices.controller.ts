//@ts-check
import _ from "lodash";
import {
  getDeviceState,
  changeDeviceState,
  getAllActiveDevices
} from "./devices.service";

export async function getDevices(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: await getAllActiveDevices()
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function getDevice(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: await getDeviceState(parseInt(req.params.id))
    });
  } catch (e) {
    handleInternalError(res, e);
  }
}

export async function changeState(req: any, res: any) {
  try {
    await changeDeviceState(
      parseInt(req.params.id, 10),
      parseInt(req.params.state, 10)
    );
    res.json({ state: 200, result: "Ok" });
  } catch (e) {
    switch (e.code) {
      case 404:
        res.status(404).json({
          status: 404,
          result: "Device not found"
        });
        break;
      default:
        handleInternalError(res, e);
    }
  }
}

function handleInternalError(res: any, e: any) {
  if (res.app.get("env") === "development") {
    res.status(500).json({
      status: 500,
      message: e.message,
      "stack-trace": e.stack
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Oups, something went wrong!"
    });
  }
}
