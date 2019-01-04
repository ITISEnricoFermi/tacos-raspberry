export const config = {
  server_port: process.env.PORT || "3000",
  node_env: process.env.NODE_ENV || "development",
  devices_timeout: 10000, // Timeout per la disconnessione di un dispositivo nel caso non si ricevano più pachetti keep-alive
  udp_rec_port: Number(process.env.REC_PORT) || 0xcafe,
  udp_dest_port: Number(process.env.DEST_PORT) || 0xbeef,
  log_level: "silly",
  log_file: "./logs.log",
  log_err_file: "./err-logs.log"
};
