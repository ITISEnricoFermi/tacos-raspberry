//@ts-check
const { IDevice } = require("./IDevice");

class IDBinary extends IDevice {
  constructor({ id = 0xb } = {}) {
    super({ id });
  }
}

module.exports = { IDBinary };
