
import { Component, type Node } from 'react'

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

export type PendingValue = any

// TODO: Import
// Isolated in case we want to modify this behavior in the future.
export const isPending: (PendingValue) => boolean = (pendingValue) => !pendingValue

export type Props = {|
  children: ?Node | ?() => ?Node,
  error: ?Error,
  errorWhenMissing: Error | () => Error,
  loading: boolean,
  renderError: (Error) => ?Node,
  renderLoading: () => ?Node,
  require: PendingValue,
|}

class LoadingSwitch extends Component<Props> {
  static displayName = 'LoadingSwitch'

  render = () => {
    let {
      children,
      error,
      errorWhenMissing,
      loading,
      renderError,
      renderLoading,
      require,
    } = this.props

    if (error) {
      return renderError(error)
    }

    if (isPending(require)) {
      if (loading) {
        return renderLoading()
      }

      return renderError(errorWhenMissing && typeof errorWhenMissing === 'function' ? errorWhenMissing() : errorWhenMissing)
    }

    return children && typeof children === 'function' ? children() : children
  }
}

export default LoadingSwitch
