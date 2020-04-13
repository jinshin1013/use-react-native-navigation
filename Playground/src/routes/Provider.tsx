import React from 'react'
import { Options } from 'react-native-navigation'
import { observer } from 'mobx-react-lite'
import { useRegisterNavigationEvents } from 'use-react-native-navigation'

import { RootType } from 'routes/types'

type WrappedComponentType = React.FC & { options?: Options }

export const wrapRoutes = (WrappedComponent: WrappedComponentType) => {
  const HOC: RootType = observer((props) => {
    useRegisterNavigationEvents({ componentId: props.componentId })

    return <WrappedComponent {...props} />
  })

  HOC.options = WrappedComponent.options
  return HOC
}
