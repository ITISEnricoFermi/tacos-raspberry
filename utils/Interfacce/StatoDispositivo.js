//@ts-check

class StatoDispositivo {
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
   * @returns {StatoDispositivo} uno stato
   * @default StatoDispositivo.Unknow
   */
  newState(state = "Unknow") {
    return new StatoDispositivo(state);
  }

  static get None() {
    return new StatoDispositivo("None");
  }
  static get Ok() {
    return new StatoDispositivo("Ok");
  }
  static get Error() {
    return new StatoDispositivo("Error");
  }
  static get Unknow() {
    return new StatoDispositivo("Unknow");
  }

  static get Off() {
    return new StatoDispositivo("Off");
  }

  static get On() {
    return new StatoDispositivo("On");
  }
}

module.exports = {
  StatoDispositivo
};
