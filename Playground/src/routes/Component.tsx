import React from 'react'
import { Button, Alert } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation, NavigationUtility } from 'use-react-native-navigation'

import { Screens } from './routes'

export type ComponentProps = {}

export const Component: React.FC<ComponentProps> = observer(() => {
  const navigation = useNavigation()

  return (
    <Button
      title="Take me to th next screen"
      onPress={() => {
        if (!navigation.status.currentComponentId) {
          return Alert.alert('Oops', 'No current component id')
        }

        return navigation
          .push(NavigationUtility.setLayoutComponent({ name: Screens.Modal1 }))
          .catch((e) => Alert.alert('Oops', `Failed navigating: ${JSON.stringify(e)}`))
      }}
    />
  )
})
