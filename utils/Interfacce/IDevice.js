// @ts-check
const { DeviceState } = require("./DeviceState");

/**
 * Dispositivi di base
 */
class IDevice {
  constructor({ id = 0xdeadbeef, stato = DeviceState.None } = {}) {
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
    if (st instanceof DeviceState) this._stato = st;
  }
}

module.exports = { IDevice };
