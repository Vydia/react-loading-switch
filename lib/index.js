'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPending = undefined;

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

Object.defineProperty(exports, 'isPending', {
  enumerable: true,
  get: function () {
    return _utils.isPending;
  }
});

var _LoadingSwitch2 = _interopRequireDefault(_LoadingSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LoadingSwitch2.default;