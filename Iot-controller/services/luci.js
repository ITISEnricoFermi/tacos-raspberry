const { IDBinario } = require("../../utils/Interfacce/IDBinario");
const { StatoDispositivo } = require("../../utils/Interfacce/StatoDispositivo");
const { srvc } = require("../mock/StateChange");

/**
 * Accendi una luce
 * @param {IDBinario} luce
 */
exports.accendi = luce => {
  try {
    srvc(luce.id, StatoDispositivo.On);
  } catch (e) {
    console.log("Error", e);
  }
};

/**
 * Spegni una luce
 * @param {IDBinario} luce
 */
exports.spegni = luce => {
  try {
    srvc(luce.id, StatoDispositivo.Off);
  } catch (e) {
    console.log("Error", e);
  }
};
