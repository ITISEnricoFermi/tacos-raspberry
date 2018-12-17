export const config = {
  mongo_uri: process.env.MONGOURI || "mongodb://127.0.0.1:27017/db",
  in_memory_db: false,
  server_port: process.env.PORT || "3000",
  node_env: process.env.NODE_ENV || "development"
};
