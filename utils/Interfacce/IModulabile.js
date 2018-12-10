// @ts-check
const { IDispositivo } = require("./IDispositivo");
const { clampgen } = require("../utils");
const clamp = clampgen(0, 1);

class IModulabile extends IDispositivo {
  constructor({ id = 0xcafe } = {}) {
    super({ id });
    this._quantita = 0;
  }

  get quantita() {
    return this._quantita;
  }

  set quantita(q) {
    this._quantita = clamp(q);
  }
}

module.exports = { IModulabile };
