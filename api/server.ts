// @ts-check
import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { socket } from "./src/socket/socket";
import root from "./src/modules/root/root.route";
import { mongoose } from "./src/config/db";
mongoose;

const app = express();
app.set("env", process.env.DEBUG ? "development" : "release");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(logger(process.env.DEBUG ? "dev" : "common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", root);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// error handler
app.use((err: any, req: any, res: any, next: Function) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

export { app, socket };
