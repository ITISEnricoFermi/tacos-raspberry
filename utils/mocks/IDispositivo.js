// @ts-check

/**
 * Dispositivi di base
 */
export class IDispositivo {
  constructor({ id = 0xdeadbeef } = {}) {
    /**
     * Mai usare _id usare id
     */
    this._id = id;
  }

  /**
   * Id del dispositivo
   * @returns {number} id
   */
  get id() {
    return this._id;
  }
}
