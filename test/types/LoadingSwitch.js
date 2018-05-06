// @flow
import React from 'react'
import LoadingSwitch from '../../src/LoadingSwitch'

export const flowTest1 = () => {
  const require = { foo: 'bar' }
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('foo')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {/* $ExpectError */}
      {({ bar }: typeof require) => (
      bar
    )}
    </LoadingSwitch>
  )
}

export const flowTest2 = () => {
  const require = 'bar'
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('bar')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {(r: typeof require) => (
      // $ExpectError
      r.THIS_PROP_DOESNT_EXIST
    )}
    </LoadingSwitch>
  )
}

export const flowTest3 = () => {
  const require = { foo: 'bar' }
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('foo')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {({ foo }: typeof require) => (
      // $ExpectError
      foo.THIS_PROP_DOESNT_EXIST
    )}
    </LoadingSwitch>
  )
}

export const flowTest4 = () => {
  const require = { foo: 'bar' }
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('foo')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {({ foo }: typeof require) => (
      foo
    )}
    </LoadingSwitch>
  )
}

export const flowTest5 = () => {
  const require = { foo: { bar: 'baz' } }
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('foo')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {({ foo: { bar } }: typeof require) => (
      bar
    )}
    </LoadingSwitch>
  )
}

export const flowTest6 = () => {
  const require = { foo: { bar: 'baz' } }
  return (
    <LoadingSwitch
      require={require}
      errorWhenMissing={() => new Error('foo')}
      loading={false}
      error={undefined}
      renderError={error => error.message}
      renderLoading={() => 'bar'}
    >
      {/* $ExpectError */}
      {({ foo: { bar: { THIS_PROP_DOESNT_EXIST } } }: typeof require) => (
      THIS_PROP_DOESNT_EXIST
    )}
    </LoadingSwitch>
  )
}

export default undefined
