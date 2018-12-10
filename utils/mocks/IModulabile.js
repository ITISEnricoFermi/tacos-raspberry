// @ts-check
const { IDispositivo } = require("./IDispositivo");

export class IModulabile extends IDispositivo {
  constructor({ id = 0xcafe } = {}) {
    super({ id });
  }
}
