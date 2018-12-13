// @ts-check
const { IDevice } = require("./IDevice");
const { clampgen } = require("../utils");
const clamp = clampgen(0, 1);

class IModulable extends IDevice {
  constructor({ id = 0xcafe } = {}) {
    super({ id });
    this._amount = 0;
  }

  get amount() {
    return this._amount;
  }

  set amount(q) {
    this._amount = clamp(q);
  }
}

module.exports = { IModulable };
