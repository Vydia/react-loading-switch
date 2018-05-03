"use strict";

module.exports = function (pendingValue) {
  return !pendingValue;
};

// Isolated in case we want to modify this behavior in the future.