// @ts-check
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const api = require("./routes/api");
const security = require("./controllers/version 1/security");
//const { mongoose } = require("./db/mongoose");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(security.authenticate);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/api", api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;
