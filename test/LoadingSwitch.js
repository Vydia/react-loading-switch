// @flow
/* eslint-disable react/no-multi-comp */
import type { ComponentType } from 'react'
import { forEach } from 'lodash'
import renderer from 'react-test-renderer'
import React, { Fragment } from 'react'
import LoadingSwitch from '../src/LoadingSwitch'

const renderError = ({ message }) => `Error: ${message}`
renderError.displayName = 'renderError'

const renderLoading = () => 'Loading'
renderLoading.displayName = 'renderLoading'

const children = fwdArgs => String(fwdArgs)
children.displayName = 'children'

const loading = true
const error = new Error('`error`: Test message')
const errorWhenMissing = () => new Error('`errorWhenMissing`: Test message')

const snapshotTest: ({|
  description: string, component: ComponentType<{||}>,
|}) => void = ({
  description, component,
}) => {
  it(description, () => {
    const element = React.createElement(component)
    expect(renderer.create(element).toJSON()).toMatchSnapshot()
  })
}

forEach([
  {
    description: 'renders `children(require)` when `require` is a truthy string',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require="whatever"
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `children(require)` when `require` is a plain object',
    component: () => {
      const require = { foo: 'bar' }
      return (
        <LoadingSwitch
          errorWhenMissing={errorWhenMissing}
          loading={loading}
          renderError={renderError}
          renderLoading={renderLoading}
          require={require}
        >
          {({ foo }: typeof require) => foo}
        </LoadingSwitch>
      )
    },
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is undefined',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require={undefined}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is a falsey string',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require=""
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is false',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require={false}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderLoading()` when `loading` is true and `require` is 0',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require={0}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderError(error)` when `error` is provided',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        error={error}
        loading={loading}
        renderError={renderError}
        renderLoading={renderLoading}
        require={require}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderError() with default `errorWhenMissing` when `loading` is false but `require` is still falsey',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={false}
        renderError={renderError}
        renderLoading={renderLoading}
        require={undefined}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderError(errorWhenMissing())` when `loading` is false but `require` is still falsey and `errorWhenMissing` is provided',
    component: () => (
      <LoadingSwitch
        errorWhenMissing={errorWhenMissing}
        loading={false}
        renderError={renderError}
        renderLoading={renderLoading}
        require={undefined}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'renders `renderError(error))` when both `error` and `errorWhenMissing` are provided',
    component: () => (
      <LoadingSwitch
        error={error}
        errorWhenMissing={errorWhenMissing}
        loading={false}
        renderError={renderError}
        renderLoading={renderLoading}
        require={undefined}
      >
        {children}
      </LoadingSwitch>
    ),
  },
  {
    description: 'can wrap with default props with different require type signatures',
    component: () => {
      const DefaultLoadingSwitch = props => (
        <LoadingSwitch
          renderLoading={() => 'Default renderLoading'}
          {...Object.freeze(props)}
        />
      )

      const ls1Require = 'foo'
      const ls2Require = { foo: 'bar' }

      return (
        <Fragment>
          <DefaultLoadingSwitch
            errorWhenMissing={errorWhenMissing}
            loading={false}
            renderError={renderError}
            require={ls1Require}
          >
            {children}
          </DefaultLoadingSwitch>
          <DefaultLoadingSwitch
            errorWhenMissing={errorWhenMissing}
            loading={false}
            renderError={renderError}
            require={ls2Require}
          >
            {({ foo }: typeof ls2Require) => foo}
          </DefaultLoadingSwitch>
        </Fragment>
      )
    },
  },
  {
    description: 'can wrap with default props and they get used',
    component: () => {
      const DefaultLoadingSwitch = props => (
        <LoadingSwitch
          renderLoading={() => 'Default renderLoading'}
          {...Object.freeze(props)}
        />
      )

      return (
        <Fragment>
          <DefaultLoadingSwitch
            errorWhenMissing={errorWhenMissing}
            loading
            renderError={renderError}
            require={undefined}
          >
            {children}
          </DefaultLoadingSwitch>
          <DefaultLoadingSwitch
            errorWhenMissing={errorWhenMissing}
            loading
            renderError={renderError}
            require=""
          >
            {children}
          </DefaultLoadingSwitch>
        </Fragment>
      )
    },
  },
], snapshotTest)
