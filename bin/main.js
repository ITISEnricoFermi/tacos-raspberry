// @ts-check

// Start API
{
  const { normalizePort, onError } = require("../utils/api-utils/utils");
  const app = require("../api/api");
  const http = require("http");

  const port = normalizePort(process.env.PORT || "3000");

  app.set("port", port);

  const server = http.createServer(app);

  server.listen(port);

  server.on("error", onError);

  server.on("listening", () => {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log(`Listening on ${bind}`);
  });
}
