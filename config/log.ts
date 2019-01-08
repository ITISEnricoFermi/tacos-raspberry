import winston = require("winston");
import moment from "moment";
import { config } from "./conf";
const { transports, createLogger, format } = winston;
const { printf, combine, label, colorize } = format;

// FIXME: Da documentare
export namespace FDLogger {
  export enum LogLevel {
    error = "error", // level 0
    warn = "warn", // level 1
    info = "info", // level 2
    verbose = "verbose", // level 3
    debug = "debug", // level 4
    silly = "silly" // level 5
  }

  const myFormat = () => {
    return printf(info => {
      let message = "";
      let prefix = `[${moment()
        .format("DD-MM-YYYY hh:mm:ss")
        .trim()}] [${info.level}] ${info.label.toUpperCase()}:`;
      if (info.splat) {
        message = `${prefix} ${info.message} ${info.splat}`;
      } else {
        message = `${prefix} ${info.message}`;
      }
      return message;
    });
  };

  function createWinstoneLogger(name: string): winston.Logger {
    const _label = label({ label: name });

    return createLogger({
      level: config.log_level || LogLevel.silly,
      format: combine(_label, myFormat()),
      transports: [
        new transports.Console({
          level: config.log_level || LogLevel.debug,
          format: combine(colorize(), _label, myFormat())
        }),
        new transports.File({
          level: LogLevel.debug,
          filename: config.log_file || "logfile.log",
          maxsize: config.log_file_max_size || 5000000
        }),
        new transports.File({
          level: LogLevel.error,
          filename: config.log_err_file || "errlog.log",
          maxsize: config.log_file_max_size || 5000000
        })
      ]
    });
  }

  export function getLogger(name: string): winston.Logger {
    return createWinstoneLogger(name);
  }
}
import getLogger = FDLogger.getLogger;
import LogLevel = FDLogger.LogLevel;
export { getLogger, LogLevel };
export default FDLogger;
