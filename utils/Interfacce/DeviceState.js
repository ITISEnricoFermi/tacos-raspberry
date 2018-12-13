//@ts-check

class DeviceState {
  constructor(state) {
    this._state = state;
  }

  get state() {
    if (this._state === "Off") {
      return 0;
    }
    if (this._state === "On") {
      return 1;
    }
    return this._state;
  }

  toString() {
    return this.state;
  }

  /**
   * Crea uno stato custom
   * @param {string} state
   * @returns {DeviceState} uno stato
   * @default DeviceState.Unknow
   */
  newState(state = "Unknow") {
    return new DeviceState(state);
  }

  static get None() {
    return new DeviceState("None");
  }
  static get Ok() {
    return new DeviceState("Ok");
  }
  static get Error() {
    return new DeviceState("Error");
  }
  static get Unknow() {
    return new DeviceState("Unknow");
  }
  static get Off() {
    return new DeviceState("Off");
  }
  static get On() {
    return new DeviceState("On");
  }
  static get Busy() {
    return new DeviceState("Busy");
  }
}

module.exports = {
  DeviceState
};
