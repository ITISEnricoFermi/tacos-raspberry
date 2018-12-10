//@ts-check
const bluebird = require("bluebird");
const mongoose = require("mongoose");
mongoose.Promise = bluebird;
const database = "mongodb://127.0.0.1:27017/chan-test";
console.log("Connecting to database...");
mongoose
  .connect(database)
  .then(() => {
    console.log(
      `Succesfully Connected to the Mongodb Database  at URL : ${database}`
    );
  })
  .catch(() => {
    console.log(
      `Error Connecting to the Mongodb Database at URL : ${database}`
    );
    process.exit(0);
  });

module.exports = { mongoose };
