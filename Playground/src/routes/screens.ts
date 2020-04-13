import { Navigation } from 'react-native-navigation'

import { wrapRoutes } from './Provider'
import { Screens } from './routes'

import { Screen1 } from './Screen1'
import { Screen2 } from './Screen2'
import { Modal1 } from './Modal1'
import { Modal2 } from './Modal2'
import { Overlay1 } from './Overlay1'
import { Overlay2 } from './Overlay2'

/**
 * Register Public routes
 */
export function registerScreens() {
  const routes = new Map()
    .set(Screens.Screen1, Screen1)
    .set(Screens.Screen2, Screen2)
    .set(Screens.Modal1, Modal1)
    .set(Screens.Modal2, Modal2)
    .set(Screens.Overlay1, Overlay1)
    .set(Screens.Overlay2, Overlay2)

  Array.from(routes).forEach(([routeName, component]) => {
    Navigation.registerComponent(routeName, () => wrapRoutes(component))
  })
}
