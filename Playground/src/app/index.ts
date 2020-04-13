import { Navigation } from 'react-native-navigation'
import { NavigationUtility } from '../../../lib'

import { defaultOptions } from '../routes/config/defaultOptions'
import { registerScreens } from '../routes/screens'
import { Screens } from '../routes/routes'

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions(defaultOptions)
  registerScreens()

  Navigation.setRoot({
    root: NavigationUtility.setLayoutStackComponents([
      {
        name: Screens.Screen1,
      },
    ]),
  })
})
