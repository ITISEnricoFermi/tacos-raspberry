//@ts-check
import bluebird from "bluebird";
import mongoose from "mongoose";
mongoose.Promise = bluebird;
const database = "mongodb://127.0.0.1:27017/db";
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
export default mongoose;
