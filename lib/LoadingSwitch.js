'use strict';

var _react = require('react');

var _isPending = require('./utils/isPending');

var _isPending2 = _interopRequireDefault(_isPending);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

class LoadingSwitch extends _react.Component {
  render() {
    let {
      children,
      error,
      errorWhenMissing,
      loading,
      renderError,
      renderLoading,
      require
    } = this.props;

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
}

LoadingSwitch.displayName = 'LoadingSwitch';

module.exports = LoadingSwitch;