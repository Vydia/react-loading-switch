'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('react');

/*
LoadingSwitch
-------------

A switcher based on the presence of data and apollo loading information.

@example
  import LoadingSwitch from 'react-loading-switch'

  const Puppy = ({ loading, error, puppy }) => (
    <LoadingSwitch
      error={error}
      errorWhenMissing={() => new Error('Missing puppy data!')}
      loading={loading}
      renderError={(error) => <DataError error={error} />}
      renderLoading={() => <Loading />}
      require={puppy}
    >
      { () => (
        <View>{ `The puppy data is here! ${puppy.id}` }</View>
      ) }
    </LoadingSwitch>
  )
*/

function LoadingSwitch(_ref) {
  var children = _ref.children,
      error = _ref.error,
      errorWhenMissing = _ref.errorWhenMissing,
      loading = _ref.loading,
      renderError = _ref.renderError,
      renderLoading = _ref.renderLoading,
      require = _ref.require;

  if (error) {
    return renderError(error);
  }

  // TODO: invariant(/* ... */) if `require` is a function.
  if (!require) {
    if (loading) {
      return renderLoading();
    }

    if (errorWhenMissing) {
      return renderError(typeof errorWhenMissing === 'function' ? errorWhenMissing() : errorWhenMissing);
    }
  }

  // TODO: It would be great if flow would type check `require` argument in children.
  return children(require);
}

LoadingSwitch.displayName = 'LoadingSwitch';

exports.default = LoadingSwitch;