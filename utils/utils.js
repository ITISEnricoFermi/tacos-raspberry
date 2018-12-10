//@ts-check

function clampgen(min, max) {
  return function(value) {
    return Math.min(max, Math.max(min, value));
  };
}

module.exports = { clampgen };
