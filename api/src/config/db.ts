//@ts-check
import mongoose from "mongoose";
import MongoMemoryServer from "mongodb-memory-server";
mongoose.Promise = Promise;

if (process.env.DEBUG) {
  const mongoServer = new MongoMemoryServer();

  mongoServer.getConnectionString().then(mongoUri => {
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    };

    connectMongoose(mongoUri, mongooseOpts);

    mongoose.connection.on("error", e => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        connectMongoose(mongoUri, mongooseOpts);
      }
    });
  });
} else {
  const database = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/db";
  connectMongoose(database, { useNewUrlParser: true });
}

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

export { mongoose };
export default mongoose;
