'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPending = undefined;

var _LoadingSwitch = require('./LoadingSwitch');

var _LoadingSwitch2 = _interopRequireDefault(_LoadingSwitch);

var _isPending2 = require('./utils/isPending');

var _isPending3 = _interopRequireDefault(_isPending2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _LoadingSwitch2.default;
const isPending = exports.isPending = _isPending3.default;