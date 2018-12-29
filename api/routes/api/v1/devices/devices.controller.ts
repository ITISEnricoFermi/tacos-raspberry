//@ts-check
import _ from "lodash";
import {
  findDeviceById,
  changeDeviceState,
  getAllActiveDevices
} from "./devices.service";

/**
 * Invia al client un oggetto json con un array di tutti i devices
 * @param req Express request object
 * @param res Express response object
 */
export async function getDevices(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: await getAllActiveDevices()
    });
  } catch (e) {
    e.code = 404;
    handleInternalError(res, e);
  }
}

/**
 * Invia al client un singolo device cercandolo dal id specificato nei params della richiesta
 * @param req Express request object
 * @param res Express response object
 */
export async function getDevice(req: any, res: any) {
  try {
    res.json({
      status: 200,
      result: JSON.stringify(await findDeviceById(parseInt(req.params.id)))
    });
  } catch (e) {
    e.code = 404;
    handleInternalError(res, e);
  }
}

/**
 * Cambia lo stato di un dispositivo che trova tramite l'id passato nei params della richiesta.
 * Lo stato viene anche esso passato nei params
 * @param req Express request object
 * @param res Express response object
 */
export async function changeState(req: any, res: any) {
  try {
    await changeDeviceState(
      parseInt(req.params.id, 10),
      parseInt(req.params.state, 10)
    );
    res.json({ state: 200, result: "Ok" });
  } catch (e) {
    e.code = 404;
    handleInternalError(res, e);
  }
}

/**
 * Viene richiamata nel caso accada un errore e invia al client i dettagli del errore
 * @param res Express response object
 * @param e Oggetto con le informazioni relative al errore
 */
function handleInternalError(res: any, e: any) {
  if (res.app.get("env") === "development") {
    res.status(e.code).json({
      status: e.code,
      result: e.message,
      "stack-trace": e.stack
    });
  } else {
    res.status(e.code).json({
      status: e.code,
      result: e.message
    });
  }
}
