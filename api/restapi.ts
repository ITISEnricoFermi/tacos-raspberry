import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Import delle configurazioni e file utili
import { config } from "../config/conf";
import { getLogger } from "../config/log";
const logger = getLogger("EXPRESS-APP");

// Configurazioni iniziali di porta, DEBUG e /api route
import api from "./routes/api.route";
import { CustomRequest, CustomResponse, CNextFunction } from "./utils/utils";

// Inizializzazione del app express, server http e server socketio
export const app = express();
app.disable("x-powered-by");

// Setup del sistema di logging del api rest
app.set("env", config.node_env);
app.use((req: CustomRequest, res: CustomResponse, next: CNextFunction) => {
  // Set logger in modo che sia utilizzabile da tutti i handler e middleware
  req.log = logger;
  res.log = logger;
  next();
});

app.use(
  morgan(":user-agent :remote-addr :method :url :status :response-time ms", {
    stream: {
      write(message) {
        logger.info(message);
      }
    }
  })
);

// Setup cross origin per il futuro e parsing delle richieste
app.use(
  cors({
    origin: "*",
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bind della route /api
app.use("/api", api);

app.use(express.static(path.join(__dirname, "/public")));

app.use((req: CustomRequest, res: CustomResponse, next: CNextFunction) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// Error handler
app.use(
  (
    err: Error,
    req: CustomRequest,
    res: CustomResponse,
    next: CNextFunction
  ) => {
    req.log.error(`${err}`);
    //@ts-ignore
    const status = err.status || 500;
    if (req.app.get("env") === "development") {
      res.status(status).json(
        add_error_to_object(
          {
            "stack-trace": err.stack
          },
          err
        )
      );
    } else {
      res.status(status).json(add_error_to_object({}, err));
    }
  }
);

function add_error_to_object(obj: any = {}, err?: Error) {
  return Object.assign(obj, { error: err ? err.message : null });
}
