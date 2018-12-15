//@ts-check
import bluebird from "bluebird";
import mongoose from "mongoose";
mongoose.Promise = bluebird;
const database = "mongodb://host:port/db";
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

export { mongoose };
