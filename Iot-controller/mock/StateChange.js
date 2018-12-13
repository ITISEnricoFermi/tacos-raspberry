// @ts-check
const { DeviceState } = require("../../utils/Interfacce/DeviceState");

/**
 * mock
 */
class StateChange {
  /**
   * Inizializzo la connessione alla rete mesh e inposto tutti
   * i handler per disconnessione, errore, ecc.
   */
  constructor() {}

  /**
   * @param {number} id
   * @param {DeviceState} state
   */
  send(id, state) {
    console.log("[" + id.toString(16) + "] Sending...", state.state);
    return true;
  }
}

module.exports = { srvc: new StateChange() };
