/**
 * Normaliza (se possibile) una porta/pipe passatagli come stringa
 * @param {string} val Valore della porta da normalizare
 */
export function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
