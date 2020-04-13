import { Navigation } from 'react-native-navigation'

import { wrapRoutes } from './Provider'
import { Screens } from './routes'

import { Screen1 } from './Screen1'
import { Screen2 } from './Screen2'
import { SingleModal } from './SingleModal'
import { StackModal } from './StackModal'
import { SingleOverlay } from './SingleOverlay'
import { StackOverlay } from './StackOverlay'

/**
 * Register Public routes
 */
export function registerScreens() {
  const routes = new Map()
    .set(Screens.Screen1, Screen1)
    .set(Screens.Screen2, Screen2)
    .set(Screens.SingleModal, SingleModal)
    .set(Screens.StackModal, StackModal)
    .set(Screens.SingleOverlay, SingleOverlay)
    .set(Screens.StackOverlay, StackOverlay)

  Array.from(routes).forEach(([routeName, component]) => {
    Navigation.registerComponent(routeName, () => wrapRoutes(component))
  })
}
