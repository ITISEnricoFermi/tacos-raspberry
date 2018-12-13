const { IDBinary } = require("../../utils/Interfacce/IDBinary");
const { DeviceState } = require("../../utils/Interfacce/DeviceState");
const { srvc } = require("../mock/statechange");

/**
 * Accendi una luce
 * @param {IDBinary} luce
 */
exports.accendi = luce => {
  try {
    srvc(luce.id, DeviceState.On);
  } catch (e) {
    console.log("Error", e);
  }
};

/**
 * Spegni una luce
 * @param {IDBinary} luce
 */
exports.spegni = luce => {
  try {
    srvc(luce.id, DeviceState.Off);
  } catch (e) {
    console.log("Error", e);
  }
};
