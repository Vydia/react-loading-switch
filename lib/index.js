'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LoadingSwitch = require('./LoadingSwitch');

Object.keys(_LoadingSwitch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _LoadingSwitch[key];
    }
  });
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});