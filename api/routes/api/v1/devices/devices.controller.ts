//@ts-check
import _ from "lodash";
import {
  findDeviceById,
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
    e.code = 404;
    handleInternalError(res, e);
  }
}

export async function getDevice(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: JSON.stringify(await findDeviceById(parseInt(req.params.id)))
    });
  } catch (e) {
    e.code = 404;
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
    e.code = 404;
    handleInternalError(res, e);
  }
}

function handleInternalError(res: any, e: any) {
  if (res.app.get("env") === "development") {
    res.status(e.code).json({
      status: e.code,
      result: e.message,
      "stack-trace": e.stack
    });
  } else {
    res.status(e.code).json({
      status: e.code,
      result: e.message
    });
  }
}
