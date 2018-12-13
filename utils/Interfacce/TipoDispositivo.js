//@ts-check

class TipoDispositivo {
  constructor(t = "") {
    this._t = t;
  }

  get tipo() {
    return this._t;
  }

  toString() {
    return this.tipo;
  }

  /**
   * Crea uno stato custom
   * @param {string} type
   * @returns {TipoDispositivo} uno stato
   * @default TipoDispositivo.Unknow
   */
  static newType(type = "Unknow") {
    return new TipoDispositivo(type);
  }

  static get Unknow() {
    return new TipoDispositivo("Unknow");
  }

  static get Modulabile() {
    return new TipoDispositivo("modulabile");
  }

  static get Binario() {
    return new TipoDispositivo("binario");
  }
}

module.exports = {
  TipoDispositivo
};
