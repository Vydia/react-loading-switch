react-loading-switch 🐶
==

React component API for easily composing the render logic surrounding react-apollo data fetching, loading, and error handling.

Compatible with React, React Native, React Web, React anything!

Getting Started
--

```shell
npm i --save react-loading-switch
```

Why?
--

### Data-related conditional rendering code mucking up our render functions

In our experience, re-writing identical or similar logic in every component can lead to problems ❌

 - Multiple programming styles result in different-looking code.
 - Difficult to digest at a glance.
 - Easy to make a mistake if hard-coding everywhere.
 - These problems grow as the codebase grows.
 - Wasted brain cycles thinking about it, writing it, reviewing it.

#### Say goodbye to `if (loading)` and `if (error)` 👋

With react-loading-switch, we won't need this:

```js
const Puppy = ({ loading, error, puppy }) => {
  if (error) {
    return <RenderError error={error} />
  }

  if (!puppy) {
    if (loading) {
      return <RenderLoading />
    }

    return <RenderError error={new Error('Missing puppy data!')} />
  }

  return (
    <View>{ `Finally the puppy is here! ${puppy.id}` }</View>
  )
}
```

We won't need this:

```js
const Puppy = ({ loading, error, puppy }) => {
  if (loading) return <RenderLoading />
  if (error) return <RenderError error={error} />

  return <View>{ `Finally the puppy is here! ${puppy.id}` }</View>
}
```

### Instead, compose this logic with `react-loading-switch` ✅

 - Consistent JSX component API.
 - Easy to digest at a glance.
 - Extensible & Functional
 - Optionally centralize a shared configuration across many components.
   - It's just a react component. Wrap it with some default props and export.

#### Hello `<LoadingSwitch />` 🍻

This example uses all available props, but in practice it gets cleaner:

```js
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
```

### DRY it up by wrapping with some default props 🤔

Share identical behavior across similar components 👩‍👦‍👦

```js
import LoadingSwitch from 'react-loading-switch'

export const PuppyLoadingSwitch = (props) => (
  <LoadingSwitch
    errorWhenMissing={() => new Error('Could not find puppy!')}
    renderLoading={() => <p>Loading puppies...</p>}
    renderError={(error) => <p>Error: {error.message}</p>}
    {...props}
  />
)
```

#### Use `<PuppyLoadingSwitch />` in every component that shares this logic

Now we're talkin' 🎉

```js
import PuppyLoadingSwitch from '../PuppyLoadingSwitch'

const Puppy = ({ loading, error, puppy }) => (
  <PuppyLoadingSwitch
    error={error}
    loading={loading}
    require={puppy}
  >
    { () => (
      <View>{ `The puppy data is here! ${puppy.id}` }</View>
    ) }
  </PuppyLoadingSwitch>
)
```

You can use one LoadingSwitch component for your entire application, or you can
use different LoadingSwitches in different areas. It's up to you!

### The function-child prop / child-render prop receives the value of `require`

This optional feature allows us to avoid long property lookup chains in JSX.
Compare the below to the above. Notice the lack of `data.puppy.whatever`

```js
const PuppyBirthday = ({ loading, error, data}) => (
  <PuppyLoadingSwitch
    /* ... */
    require={data && data.puppy}
  >
    { ({ name, birthday }) => (
      <View>{ `${name}'s birthday is ${birthday}!` }</View>
    ) }
  </PuppyLoadingSwitch>
)
```

### With React-Apollo `<Query />` components

```js
import PuppyLoadingSwitch from '../PuppyLoadingSwitch'
import { Query } from 'react-apollo'

const GET_PUPPY = gql`
  query puppy($puppyId: ID!) {
    puppy(id: $puppyId) {
      id
      name
      birthday
    }
  }
`;

const PuppyBirthday = ({ puppyId }) => (
  <Query query={GET_PUPPY} variables={{ puppyId }}>
    {({ loading, error, data}) => (
      <PuppyLoadingSwitch
        error={error}
        loading={loading}
        require={data && data.puppy}
      >
        { ({ name, birthday }) => (
          <View>{ `${name}'s birthday is ${birthday}!` }</View>
        ) }
      </PuppyLoadingSwitch>
    )}
  </Query>
)
```

### Versitile `require` prop uses JavaScript truthy/falsey checking.

Falsey in JavaScript: `false || null || undefined || 0 || '' || NaN`

```js
const Puppy = ({ loading, error, someData, moreData }) => (
  <PuppyLoadingSwitch
    /* ... */
    require={someData && moreData && moreData.foo}
  >
    { () => (
      <View>{ moreData.foo.name }</View>
    ) }
  </PuppyLoadingSwitch>
)
```

API
--

See the [test/](test/) directory in this repo for detailed snapshot tests that cover the whole API.

React-Apollo fetch policies
--

Most of the [React-Apollo example apps](https://github.com/apollographql/react-apollo/blob/d57f25237c69f78a7e52b586d2303844baf2d4e0/examples/ssr/imports/app.js#L25-L43) use [this pattern](https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-loading), where loading takes precedence:

```js
export const Character = withCharacter(({ loading, hero, error }) => {
  if (loading) return <div>Loading</div>;
  // ...
```

### `fetchPolicy: 'cache-and-network'` conflicts with the above

Excerpt from the [`apollo-client` README](https://github.com/apollographql/apollo-client/blob/9ebbb61fb1061f56edf0bedb965c9954f75afead/docs/source/api/react-apollo.md#dataloading)

> However, just because `data.loading` is true it does not mean that you won’t have data. For instance, if you already have `data.todos`, but you want to get the latest todos from your API `data.loading` might be true, but you will still have the todos from your previous request.

tl;dr we might still want to render the data we have, even if `loading === true`.

### ReactLoadingSwitch considers `data` before `loading`

As long as there is no `error`, and `require` is truthy, it renders its `children`; even if `loading === true`. Now we can safely use the `cache-and-network` fetch-policy with no chance of seeing a loading state when we have data we could be rendering.

From [`src/LoadingSwitch.js`](https://github.com/Vydia/react-loading-switch/blob/0e87d845f129cba525d44c4162d4b2305a2826fd/src/LoadingSwitch.js#L55-L67)

```js
if (error) {
  return renderError(error)
}

if (!require) {
  if (loading) {
    return renderLoading()
  }

  if (errorWhenMissing) {
    return renderError(typeof errorWhenMissing === 'function' ? errorWhenMissing() : errorWhenMissing)
  }
}

return children(require)
```

#### However, it's easy to revert to the classic example behavior

In this example, `renderLoading` will be rendered if `loading` is truthy, even if we have some other data:

```js
require={!loading && puppy}
```

Now when `loading` is truthy `require` evaluates falsey.

```js
import PuppyLoadingSwitch from '../PuppyLoadingSwitch'

const Puppy = ({ loading, error, puppy }) => (
  <PuppyLoadingSwitch
    error={error}
    loading={loading}
    require={!loading && puppy}
  >
    { () => (
      <View>
        { `We are not loading and the puppy data is here! ${puppy.id}` }
      </View>
    ) }
  </PuppyLoadingSwitch>
)
```

Or, if we only care about `loading` and `error`, we don't need to check for data presence:

```js
import PuppyLoadingSwitch from '../PuppyLoadingSwitch'

const Puppy = ({ loading, error, puppy }) => (
  <PuppyLoadingSwitch
    error={error}
    loading={loading}
    require={!loading}
  >
    { () => (
      <View>
        { `We are not loading! ${puppy.id}` }
      </View>
    ) }
  </PuppyLoadingSwitch>
)
```
