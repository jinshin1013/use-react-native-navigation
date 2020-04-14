# use-react-native-navigation (Experimental)

A utility library for easier use of react-native-navigation library.

## Installation

npm: `npm install use-react-native-navigation`

yarn: `yarn add use-react-native-navigation`

## Prerequisite

This library assumes that your React-Native project has integrated the following libraries:

- [React-Native-Navigation](https://github.com/wix/react-native-navigation/)
- [MobX](https://github.com/mobxjs/mobx) and [Mobx-React ](https://github.com/mobxjs/mobx-react)/[Mobx-React-Lite](https://github.com/mobxjs/mobx-react-lite)

## How to get started

When you are registering your RNN screen, you need to wrap your screen with a HOC to add `useTrackNavigation` to hook into RNN event listener.

### Step 1 - Create a HOC with useTrackNavigation hook

```tsx
// HOC.tsx
import React from 'react'
import { observer } from 'mobx-react' // 'mobx-react-lite'
import { useTrackNavigation } from 'use-react-native-navigation'

export const wrapRNNScreen = (WrappedComponent) => {
  const HOC = observer(function HOC(props) {
    // This will allow the library to hook into RNN event listeners such as
    // componentDidAppear, componentDidDisappear and modalDismissed.
    useTrackNavigation(props.componentId)

    return <WrappedComponent {...props} />
  })

  // Hoise RNN options.
  HOC.options = WrappedComponent.options
  return HOC
}
```

### Step 2 - Register your screen with HOC

```tsx
// index.js
import { Navigation } from 'react-native-navigation'
import { wrapRNNScreen } from './HOC'
import { App } from './App'

// Register your screens with wrapRNNScreen HOC.
Navigation.registerComponent('App', () => wrapRNNScreen(App))
```

### Step 3 - Using useNavigation hook

```tsx
// App.tsx
import React from 'react'
import { Button } from 'react-native'
import { observer } from 'mobx-react' // 'mobx-react-lite'
import { useNavigation, NavigationUtility } from 'use-react-native-navigation'

export const App = observer(function App() {
  const navigation = useNavigation()

  const push = () => {
    // Notice that we are not using componentId!
    navigation.push(
      NavigationUtility.setLayoutComponent({
        name: 'PushScreen', // name of other registered screen.
      })
    )
  }

  return (
    <View>
      <Button title="Push!" onPress={push} />
    </View>
  )
})
```

That's it! Now you should be able to `push`, `pop`, `dismissModal` and `dismissOverlay` from anywhere in the component tree.

## Limitation

### Immediate availability of tracked componentId

As the library relies on the Navigation events, specifically `componentDidAppear`, `componentDidDisappear` and `modalDismissed`, emitted from React-Native-Navigation, the most recent `componentId` will only be available after the screen is visible/invisible to the user.

For example, if you try to perform navigation before the screen is visible to the user, you might encounter an unexpected behaviour.

```tsx
// App.tsx
const App = () => {
  const navigation = useNavigation()

  // You should NOT do this as `componentId` is not guaranteed to be upto date.
  useEffect(() => {
    navigation.push({ ...layout })
  }, [navigation.push])

  // You can do this instead.
  useEffect(() => {
    // You can assume if `updating === false` then the navigation event has completed.
    if (navigation.status.updating) return
    navigation.push({ ...layout })
  }, [navigation.status.updating])

  // However it's best used with component interaction. As `componentId`
  // is almost guaranteed to be available if the component is shown.
  return <Button onPress={() => navigation.push({ ...layout })} />
}
```

## NavigationUtility

These navigation utility functions aim to abstract some of the RNN Layout boilerplate required. These functions are
also compatible with the vanilla RNN navigation functions.

### setLayoutComponent

Create a single layout `component`.

```tsx
// Vanilla RNN
import { Navigation } from 'react-native-navigation'

Navigation.push(
  'screenComponentId',
  NavigationUtility.setLayoutComponent<PushScreenProps>({
    name: 'PushScreen',
    passProps: {
      // ...props
    },
    option: {
      // ...navigation options
    }
  })
)

// useNavigation
import { useNavigation } from 'use-react-native-navigation'

const navigation = useNavigation()
navigation.push(
  NavigationUtility.setLayoutComponent<PushScreenProps>({
    name: 'PushScreen',
    passProps: {
      // ...props
    },
    option: {
      // ...navigation options
    }
  })
)
```

### setLayoutStackComponents

Create a stack layout `component`.

```tsx
// Vanilla RNN
import { Navigation } from 'react-native-navigation'

Navigation.setRoot({
  root: NavigationUtility.setLayoutStackComponents<RootScreenProps>([
    {
      name: 'RootScreen',
      passProps: {
        // ...props
      },
      option: {
        // ...navigation options
      },
    },
  ]),
})

// useNavigation
import { useNavigation } from 'use-react-native-navigation'

const navigation = useNavigation()
navigation.setRoot({
  root: NavigationUtility.setLayoutStackComponents<RootScreenProps>([
    {
      name: 'RootScreen',
      passProps: {
        // ...props
      },
      option: {
        // ...navigation options
      },
    },
  ]),
})
```
