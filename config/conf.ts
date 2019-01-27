export const config = {
  server_port: process.env.PORT || "3000",
  node_env: process.env.NODE_ENV || "development",
  devices_timeout: 10000, // Timeout per la disconnessione di un dispositivo nel caso non si ricevano più pachetti keep-alive (in ms)
  udp_rec_port: Number(process.env.REC_PORT) || 0xbeaf,
  udp_dest_port: Number(process.env.DEST_PORT) || 0xcafe,
  log_level: process.env.LOG_LEVEL || "silly",
  log_file: "./logs.log",
  log_err_file: "./err-logs.log",
  log_file_max_size: 5000000 // massima grandezza file di log in bytes (5MB)
};
