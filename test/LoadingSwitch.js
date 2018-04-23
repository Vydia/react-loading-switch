// @flow
/* eslint-disable react/no-multi-comp */
const { forEach } = require('lodash')
const LoadingSwitch = require('../lib/LoadingSwitch')
const isPending = require('../lib/utils/isPending')
const renderer = require('react-test-renderer')
const React = require('react')

const renderError = ({ message }) => `Error: ${message}`
renderError.displayName = 'renderError'

const renderLoading = () => 'Loading'
renderLoading.displayName = 'renderLoading'

const children = () => 'Children'
children.displayName = 'children'

const loading = true
const error = new Error('`error`: Test message')
const errorWhenMissing = () => new Error('`errorWhenMissing`: Test message')

const propsMissingData = {
  errorWhenMissing,
  loading: false,
  renderError,
  require: undefined,
}

forEach([
  {
    description: 'renders `children()` when `require` is truthy',
    props: {
      children,
      require: 'whatever',
    },
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is undefined',
    props: {
      loading,
      renderLoading,
      require: undefined,
    },
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is false',
    props: {
      loading,
      renderLoading,
      require: false,
    },
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is 0',
    props: {
      loading,
      renderLoading,
      require: 0,
    },
  },
  {
    description: 'renders `renderError(error)` when `error` is provided',
    props: {
      error,
      renderError,
    },
  },
  {
    description: 'renders `renderError(errorWhenMissing())` when `loading` is false but `require` is still falsey',
    props: {
      ...propsMissingData,
    },
  },
  {
    description: 'renders `renderError(error))` when both `error` and `errorWhenMissing` are provided',
    props: {
      ...propsMissingData,
      errorWhenMissing,
      error,
    },
  },
], ({ description, props: { children, ...props } }) => {
  it(description, () => {
    const element = React.createElement(LoadingSwitch, props, children)
    expect(renderer.create(element).toJSON()).toMatchSnapshot()
  })
})

// TODO: Move to separate file.
describe('isPending', () => {
  forEach([
    {
      param: undefined,
      expected: true,
    },
    {
      param: null,
      expected: true,
    },
    {
      param: false,
      expected: true,
    },
    {
      param: 0,
      expected: true,
    },
    {
      param: '',
      expected: true,
    },
    {
      param: [],
      expected: false,
    },
    {
      param: {},
      expected: false,
    },
    {
      param: 'whatever',
      expected: false,
    },
    {
      param: { foo: undefined },
      expected: false,
    },
    {
      param: { foo: null },
      expected: false,
    },
  ], ({ param, expected }) => {
    describe(`when given ${JSON.stringify(param)}`, () => {
      it(`returns ${expected}`, () => {
        expect(isPending(param)).toEqual(expected)
      })
    })
  })
})
