//@ts-check
const { IDispositivo } = require("./IDispositivo");

class IDBinario extends IDispositivo {
  constructor({ id = 0xb } = {}) {
    super({ id });
  }
}

module.exports = { IDBinario };
