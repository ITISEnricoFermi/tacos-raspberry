export const config = {
  in_memory_db: false,
  mongo_uri: process.env.MONGOURI || "mongodb://127.0.0.1:27017/db",
  server_port: process.env.PORT || "3000",
  node_env: process.env.NODE_ENV || "development",
  jwt_salt: process.env.SECRET || "<<#[TheTokenSalt]#>>"
};
