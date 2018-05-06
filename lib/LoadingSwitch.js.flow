// @flow
import { type Node } from 'react'

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

export type LoadingSwitchProps<RequireType> = {|
  error?: ?Error,
  errorWhenMissing: () => Error,
  loading: boolean,
  renderError: (Error) => ?Node,
  renderLoading: () => ?Node,
  require: RequireType,
  children: (RequireType) => ?Node,
|}

export type Props = LoadingSwitchProps<*>

function LoadingSwitch({
  children,
  error,
  errorWhenMissing,
  loading,
  renderError,
  renderLoading,
  require,
}: Props): ?Node {
  if (error) {
    return renderError(error)
  }

  // TODO: invariant(/* ... */) if `require` is a function.
  if (!require) {
    if (loading) {
      return renderLoading()
    }

    if (errorWhenMissing) {
      return renderError(typeof errorWhenMissing === 'function' ? errorWhenMissing() : errorWhenMissing)
    }
  }

  // TODO: It would be great if flow would type check `require` argument in children.
  return children(require)
}
LoadingSwitch.displayName = 'LoadingSwitch'

export default LoadingSwitch
