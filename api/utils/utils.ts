import winston = require("winston");
import { NextFunction, Request, Response, RequestHandler } from "express";

/**
 * Normaliza (se possibile) una porta/pipe passatagli come stringa
 * @param {string} val Valore della porta da normalizare
 */
export function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export interface CustomRequest extends Request {
  log: winston.Logger;
  params: {
    [key: string]: string;
  };
  json: (obj: any) => any;
  [key: string]: any;
}

export interface CustomResponse extends Response {
  log: winston.Logger;
  [key: string]: any;
}

export interface CRequestHandler extends RequestHandler {
  // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
  (req: CustomRequest, res: CustomResponse, next: CNextFunction): any;
}

export interface CNextFunction extends NextFunction {
  // tslint:disable-next-line callable-types (In ts2.1 it thinks the type alias has no call signatures)
  (err?: any): void;
}
