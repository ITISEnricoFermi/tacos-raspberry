//@ts-check
import mongoose from "mongoose";
import { config } from "./conf";
mongoose.Promise = Promise;

function connectMongoose(
  databaseUri: string,
  options?: mongoose.ConnectionOptions
): void {
  mongoose
    .connect(
      databaseUri,
      options
    )
    .then(() => {
      console.log(
        `Succesfully Connected to the Mongodb Database  at URL : ${databaseUri}`
      );
    })
    .catch(() => {
      console.log(
        `Error Connecting to the Mongodb Database at URL : ${databaseUri}`
      );
      process.exit(0);
    });
}
connectMongoose(config.mongo_uri, { useNewUrlParser: true });

export { mongoose };
export default mongoose;
