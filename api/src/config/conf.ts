export const config = {
  mongo_uri: process.env.MONGOURI || "mongodb://user1:password1@ds049854.mlab.com:49854/domotica",
  server_port: process.env.PORT || "3000",
  node_env: process.env.NODE_ENV || "development",
  jwt_secret: "P3SC3TTI"
};
