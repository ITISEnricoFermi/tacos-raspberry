// @ts-check
const { StatoDispositivo } = require("./StatoDispositivo");

/**
 * Dispositivi di base
 */
class IDispositivo {
  constructor({ id = 0xdeadbeef, stato = StatoDispositivo.None } = {}) {
    /**
     * Mai usare _id usare id
     */
    this._id = id;
    this._stato = stato;
  }

  /**
   * Id del dispositivo
   * @returns {number} id
   */
  get id() {
    return this._id;
  }

  get state() {
    return this._stato;
  }

  /**
   * Stato del dispositivo
   */
  set state(st) {
    if (st instanceof StatoDispositivo) this._stato = st;
  }
}

module.exports = { IDispositivo };
