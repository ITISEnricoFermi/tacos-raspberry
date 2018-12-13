//@ts-check
const { getall, getstate } = require("../../../Iot-controller/mock/devices");

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

function handleInternalError(res, e) {
  res.status(500).json({
    status: 500,
    message: res.app.get("env") === "development" ? e.message : ""
  });
}
