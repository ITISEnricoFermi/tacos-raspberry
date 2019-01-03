import { DeviceState } from "../interfaces/DeviceState";

export async function do_the_thing(devid: number, state: DeviceState) {
  const e = Error(
    "Cambio di stato tramite api non implementato correttamente!"
  );
  //@ts-ignore
  e.code = 500;
  throw e;
}
