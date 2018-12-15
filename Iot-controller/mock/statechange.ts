import { DeviceState } from "../interfaces/DeviceState";

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
  send(id: number, state: DeviceState) {
    console.log("[" + id.toString(16) + "] Sending...", state);
    return true;
  }
}

export default new StateChange();
