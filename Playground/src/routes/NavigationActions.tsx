import React from 'react'
import { Button } from 'react-native'
import { observer } from 'mobx-react-lite'

import { useNavigation, NavigationUtility } from '../../../lib'
import { Screens } from './routes'
import { Screen1Props } from './Screen1'
import { Screen2Props } from './Screen2'
import { SingleModalProps } from './SingleModal'
import { StackModalProps } from './StackModal'
import { SingleOverlayProps } from './SingleOverlay'

export type NavigationActionsProps = {}

export const NavigationActions: React.FC<NavigationActionsProps> = observer(
  function NavigationActions() {
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

        <Button title="Dismiss modal" onPress={() => navigation.dismissModal()} />
        <Button title="Dismiss all modals" onPress={() => navigation.dismissAllModals()} />
        <Button title="Dismiss overlay" onPress={() => navigation.dismissOverlay()} />
      </>
    )
  }
)
