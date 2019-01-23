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

  if (port > 0) {
    return port;
  }

  throw new Error("Invalid port: " + val);
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
  (req: CustomRequest, res: CustomResponse, next: CNextFunction): any;
}

export interface CNextFunction extends NextFunction {
  (err?: any): void;
}
