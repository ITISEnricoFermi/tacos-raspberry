import winston = require("winston");
import { config } from "./conf";
const { transports, createLogger, format } = winston;
const { printf, combine, label, timestamp, colorize } = format;

export namespace FDLogger {
  export enum LogLevel {
    error = "error",
    warn = "warn",
    info = "info",
    verbose = "verbose",
    debug = "debug",
    silly = "silly"
  }

  const myFormat = printf(info => {
    return `[${info.timestamp}] [${info.level}] ${info.label}: ${info.message}`;
  });

  const _label = label({ label: "main" });
  const _timestamp = timestamp();

  const rootLogger: winston.Logger = createLogger({
    level: LogLevel.silly,
    format: combine(_label, _timestamp, myFormat),
    transports: [
      new transports.Console({
        level: config.log_level || LogLevel.debug,
        format: combine(colorize(), _label, _timestamp, myFormat)
      }),
      new transports.File({
        level: LogLevel.silly,
        filename: config.log_file || "logfile.log"
      }),
      new transports.File({
        level: LogLevel.error,
        filename: config.log_err_file || "errlog.log"
      })
    ]
  });

  function createWinstoneLogger(name: string): winston.Logger {
    return rootLogger; /*.child({
      format:
    });*/
  }

  export function getLogger(name: string): winston.Logger {
    return createWinstoneLogger(name);
  }

  export function getRootLogger() {
    return rootLogger;
  }
}
import getLogger = FDLogger.getLogger;
import LogLevel = FDLogger.LogLevel;
export { getLogger, LogLevel };
export default FDLogger;
