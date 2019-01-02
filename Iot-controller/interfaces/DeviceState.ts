/**
 * Enum che rappresenta i possibili stati dei dispositivi
 */
export enum DeviceState {
  None = 0,
  Ok,
  On,
  Off,
  Unknown,
  Busy,
  Disconnected
}

export default DeviceState;
