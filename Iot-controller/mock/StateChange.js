// @ts-check
const { StatoDispositivo } = require("../../utils/Interfacce/StatoDispositivo");

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
   * @param {StatoDispositivo} state
   */
  send(id, state) {
    console.log("[" + id.toString(16) + "] Sending...", state.state);
  }
}

module.exports = { srvc: new StateChange() };
