import { DeviceState } from "../interfaces/DeviceState";

export function do_the_thing(id: number, state: DeviceState) {
  const e = Error(
    "Cambio di stato tramite api non implementato correttamente!"
  );
  //@ts-ignore
  e.code = 500;
  throw e;
}
