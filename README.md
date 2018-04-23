react-loading-switch
==

React component API for easily composing the render logic surrounding react-apollo data fetching, loading, and error handling.

Getting Started
--

```shell
npm i --save react-loading-switch
```

Example
--

```js
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
```

API
--

See the [test/](test/) directory in this repo for detailed snapshot tests that cover the whole API.
