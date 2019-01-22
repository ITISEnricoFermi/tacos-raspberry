//@ts-check
import _ from "lodash";
import {
  findDeviceById,
  changeDeviceState,
  getAllActiveDevices,
  getDeviceState
} from "./devices.service";
import { CustomRequest, CustomResponse } from "../../../../utils/utils";

/**
 * Invia al client un oggetto json con un array di tutti i devices
 * @param req Express request object
 * @param res Express response object
 */
export async function getDevices(req: CustomRequest, res: CustomResponse) {
  try {
    req.log.info("Richisti tutti i dispositivi.");
    res.json(add_error_to_object(await getAllActiveDevices()));
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
export async function getDevice(req: CustomRequest, res: CustomResponse) {
  try {
    req.log.info(`Richisto dispositivo ${req.params.id}`);
    res.json(
      add_error_to_object(await findDeviceById(parseInt(req.params.id)))
    );
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
export async function changeState(req: CustomRequest, res: CustomResponse) {
  try {
    res.log.info(
      `Richiesto cambio di stato: ${req.params.id} to ${req.params.state}`
    );
    res.json(
      add_error_to_object(
        await changeDeviceState(parseInt(req.params.id, 10), req.params.state)
      )
    );
  } catch (e) {
    if (!e.code) e.code = 404;
    handleInternalError(res, e);
  }
}

export async function getState(req: CustomRequest, res: CustomResponse) {
  try {
    req.log.info(
      `Richiesto stato della connessione del device: ${req.params.id}`
    );
    res.json(
      add_error_to_object(await getDeviceState(parseInt(res.params.id)))
    );
  } catch (e) {
    handleInternalError(res, e);
  }
}

/**
 * Viene richiamata nel caso accada un errore e invia al client i dettagli del errore
 * @param res Express response object
 * @param e Oggetto con le informazioni relative al errore
 */
function handleInternalError(res: CustomResponse, e: any) {
  res.log.error(`Errore ${e}: ${e.stack}`);

  if (res.app.get("env") === "development") {
    res.status(e.code).json(add_error_to_object({ "stack-trace": e.stack }, e));
  } else {
    res.status(e.code).json(add_error_to_object({}, e));
  }
}

function add_error_to_object(obj: any = {}, err?: Error) {
  return Object.assign(obj, { error: err ? err.message : null });
}
