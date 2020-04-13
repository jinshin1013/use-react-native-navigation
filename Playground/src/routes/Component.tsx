import React from 'react'
import { Button, StyleSheet, ViewStyle, View } from 'react-native'
import { observer } from 'mobx-react-lite'

import { useNavigation, NavigationUtility } from '../../../lib'
import { Screens } from './routes'
import { Screen1Props } from './Screen1'
import { Screen2Props } from './Screen2'
import { SingleModalProps } from './SingleModal'
import { StackModalProps } from './StackModal'
import { SingleOverlayProps } from './SingleOverlay'
import { StackOverlayProps } from './StackOverlay'

export type ComponentProps = {}

export const Component: React.FC<ComponentProps> = observer(function Component() {
  const navigation = useNavigation()
  return (
    <>
      <Button
        title="Push to Screen 1"
        onPress={() =>
          navigation.push(
            NavigationUtility.setLayoutComponent<Screen1Props>({ name: Screens.Screen1 })
          )
        }
      />
      <Button
        title="Push to Screen 2"
        onPress={() =>
          navigation.push(
            NavigationUtility.setLayoutComponent<Screen2Props>({ name: Screens.Screen2 })
          )
        }
      />

      <Button
        title="Show Single Layout Modal"
        onPress={() =>
          navigation.showModal(
            NavigationUtility.setLayoutComponent<SingleModalProps>({ name: Screens.SingleModal })
          )
        }
      />
      <Button
        title="Show Stack Layout Modal"
        onPress={() =>
          navigation.showModal(
            NavigationUtility.setLayoutStackComponents<StackModalProps>([
              { name: Screens.StackModal },
            ])
          )
        }
      />

      <Button
        title="Show Single layout Overlay"
        onPress={() =>
          navigation.showOverlay<SingleOverlayProps>(
            NavigationUtility.setLayoutComponent({ name: Screens.SingleOverlay })
          )
        }
      />
      <Button
        title="Show Stack Layout Overlay"
        onPress={() =>
          navigation.showOverlay<StackOverlayProps>(
            NavigationUtility.setLayoutStackComponents([{ name: Screens.StackOverlay }])
          )
        }
      />

      <Button title="Dismiss modal" onPress={() => navigation.dismissModal()} />
      <Button title="Dismiss overlay" onPress={() => navigation.dismissOverlay()} />
    </>
  )
})

interface Style {
  button: ViewStyle
}

const styles = StyleSheet.create<Style>({
  button: {
    marginVertical: 10,
  },
})
