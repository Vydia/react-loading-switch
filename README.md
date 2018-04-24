react-loading-switch 🐶
==

React component API for easily composing the render logic surrounding react-apollo data fetching, loading, and error handling.

Compatible with React, React Native, React Web, React anything!

The Problem:
--

### Data-related conditional rendering in every component

In our experience, re-writing identical or similar logic in every component is bad.

 - ❌ Error prone.
 - ❌ Multiple programming styles result in very different-looking code.
 - ❌ Difficult to digest at a glance.
 - ❌ Problem grows as codebase grows.

#### This sucks 👎

```js
render = () => {
  const { loading, error, puppy } = this.props.data

  if (error) {
    return <RenderError error={error} />
  }

  if (!puppy) {
    if (loading) {
      return <RenderLoading />
    }

    return <RenderError error={new Error('Could not find puppy!')} />
  }

  return (
    <View>{ `Finally the puppy is here! ${puppy.id}` }</View>
  )
}
```

### Instead, compose your rendering with `react-loading-switch`!

 - ✅ Consistent JSX component API.
 - ✅ Easy to digest at a glance.
 - ✅ Extensible & Functional
 - ✅ Centralized default configuration across multiple components if desired.
 - ✅ It's just a react component. Wrap it with default props if you want to share functionality between components.

#### Meet `<LoadingSwitch />` 👍

```js
import LoadingSwitch from 'react-loading-switch'

render() {
  const { loading, error, puppy } = this.props.data

  return (
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
}
```

#### DRY it up by wrapping with some default props 🎉

```js
import MyLoadingSwitch from '../MyLoadingSwitch'

render() {
  const { loading, error, puppy } = this.props.data

  return (
    <MyLoadingSwitch
      error={error}
      loading={loading}
      require={puppy}
    >
      { () => (
        <View>{ `The puppy data is here! ${puppy.id}` }</View>
      ) }
    </MyLoadingSwitch>
  )
}
```

#### With React-Apollo's shiny new `<Query />` components :godmode:

```js
import LoadingSwitch from 'react-loading-switch'
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
    {({ loading, error, data: { puppy } }) => (
      <LoadingSwitch
        error={error}
        errorWhenMissing={() => new Error('Missing puppy birthday data!')}
        loading={loading}
        renderError={(error) => <PuppyBirthdayError error={error} />}
        renderLoading={() => <PuppyBirthdayLoading />}
        require={puppy}
      >
        { () => (
          <View>{ `${name}'s birthday is ${puppy.birthday}!` }</View>
        ) }
      </LoadingSwitch>
    )}
  </Query>
)
```

#### Require multiple things! It uses JavaScript's truthy/falsey checking.

*Remember falsey in JavaScript: `false || null || undefined || 0 || '' || NaN` * :neckbeard:

```js
render() {
  const { loading, error, someData, moreData } = this.props.data

  return (
    <MyLoadingSwitch
      error={error}
      loading={loading}
      require={someData && moreData && moreData.hasTheRequiredThing}
    >
      { () => (
        <View>{ moreData.hasTheRequiredThing }</View>
      ) }
    </MyLoadingSwitch>
  )
}
```

Getting Started
--

```shell
npm i --save react-loading-switch
```

API
--

See the [test/](test/) directory in this repo for detailed snapshot tests that cover the whole API.
