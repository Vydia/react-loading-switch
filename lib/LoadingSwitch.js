'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _isPending = require('./utils/isPending');

var _isPending2 = _interopRequireDefault(_isPending);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
LoadingSwitch
-------------

A switcher based on the presence of data and apollo loading information.

Note: This component is generic enough that it should be its own package shared
between our mobile and web apps, and also really any app that uses react-apollo

@example
  render() {
    const { loading, error, media, artist } = this.props.data

    <LoadingSwitch
      error={error}
      errorWhenMissing={() => new Error('Missing required data!')}
      loading={loading}
      renderError={(error) => <DataError error={error} />}
      renderLoading={() => <Loading />}
      require={media && artist}
    >
      { () => (
        <Text>This is rendered when have the data! { media.id }</Text>
      ) }
    </LoadingSwitch>
  }
*/

var LoadingSwitch = function (_Component) {
  _inherits(LoadingSwitch, _Component);

  function LoadingSwitch() {
    _classCallCheck(this, LoadingSwitch);

    return _possibleConstructorReturn(this, (LoadingSwitch.__proto__ || Object.getPrototypeOf(LoadingSwitch)).apply(this, arguments));
  }

  _createClass(LoadingSwitch, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          error = _props.error,
          errorWhenMissing = _props.errorWhenMissing,
          loading = _props.loading,
          renderError = _props.renderError,
          renderLoading = _props.renderLoading,
          require = _props.require;


      if (error) {
        return renderError(error);
      }

      if ((0, _isPending2.default)(require)) {
        if (loading) {
          return renderLoading();
        }

        return renderError(errorWhenMissing && typeof errorWhenMissing === 'function' ? errorWhenMissing() : errorWhenMissing);
      }

      return children && typeof children === 'function' ? children() : children;
    }
  }]);

  return LoadingSwitch;
}(_react.Component);

LoadingSwitch.displayName = 'LoadingSwitch';

module.exports = LoadingSwitch;