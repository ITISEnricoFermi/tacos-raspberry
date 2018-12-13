//@ts-check
const _ = require("lodash");
const { getall, getstate } = require("../../../Iot-controller/mock/devices");
const { do_the_thing } = require("../../../Iot-controller/services/lights");
const { DeviceType } = require("../../../utils/Interfacce/DeviceType");

exports.getDevices = async (req, res) => {
  try {
    res.json({
      status: 200,
      result: await getall()
    });
  } catch (e) {
    handleInternalError(res, e);
  }
};

exports.getDevice = async (req, res) => {
  try {
    res.json({
      status: 200,
      result: await getstate(req.params.id)
    });
  } catch (e) {
    handleInternalError(res, e);
  }
};

exports.changeState = async (req, res) => {
  let device = null;

  try {
    device = await getstate(req.params.id);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      result: "Device not found"
    });
  }

  if (device.type === DeviceType.Binary.type) {
    const r = await do_the_thing(parseInt(device.id), req.params.state);
    res.status(r ? 200 : 500).json({
      state: r ? 200 : 500,
      message: r ? "Ok" : "Error"
    });
  }
};

function handleInternalError(res, e) {
  res.status(500).json({
    status: 500,
    message: res.app.get("env") === "development" ? e.message : ""
  });
}
