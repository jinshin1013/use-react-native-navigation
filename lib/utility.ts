import { Layout, Options } from 'react-native-navigation'

export type NavigationProps<P> = {
  name: string
  passProps?: P
  option?: Options
}

export const NavigationUtility = {
  /**
   * Set single component layout
   */
  setLayoutComponent<P>(props: NavigationProps<P>): Layout<P> {
    return {
      component: { ...props },
    }
  },

  /**
   * Set stacked component layout
   */
  setLayoutStackComponents<P>(childrenProps: NavigationProps<P>[], options?: Options): Layout {
    return {
      stack: { children: childrenProps.map((prop) => this.setLayoutComponent(prop)), options },
    }
  },
}
