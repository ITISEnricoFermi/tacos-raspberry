//@ts-check

class DeviceType {
  constructor(t = "") {
    this._t = t;
  }

  get type() {
    return this._t;
  }

  toString() {
    return this.type;
  }

  /**
   * Crea uno stato custom
   * @param {string} type
   * @returns {DeviceType} uno stato
   * @default Devicetype.Unknow
   */
  static newType(type = "unknow") {
    return new DeviceType(type);
  }
  static get Unknow() {
    return new DeviceType("unknow");
  }
  static get Modulable() {
    return new DeviceType("modulable");
  }
  static get Binary() {
    return new DeviceType("binary");
  }
}

module.exports = {
  DeviceType
};
