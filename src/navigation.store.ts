import { createContext, useContext } from 'react'
import { Navigation, Options, Layout, LayoutRoot } from 'react-native-navigation'
import { observable, action } from 'mobx'

import { NavigationProps, NavigationUtility } from './utility'
export type NavigationCommandType =
  | 'SET_ROOT'
  | 'SET_NEW_STACK_ROOT'
  | 'PUSH'
  | 'POP'
  | 'POP_TO'
  | 'POP_TO_ROOT'
  | 'SHOW_MODAL'
  | 'DISMISS_MODAL'
  | 'DISMISS_ALL_MODALS'
  | 'SHOW_OVERLAY'
  | 'DISMISS_OVERLAY'

export type NavigationStatus = {
  updating: boolean
  currentComponentId: null | string
  previousComponentId: null | string
  commandType: NavigationCommandType | null
}

export class NavigationStore {
  @observable status: NavigationStatus = {
    /**
     * Whether the current componentId is still being set.
     * There may be some delay in setting the latest componentId as
     * it relies on `componentDidAppear` and `componentDidDisappear` events.
     */
    updating: false,
    /**
     * Current componentId visible to the user.
     */
    currentComponentId: null,
    /**
     * Previous componentId that was visible to the user.
     * This is useful for overlay and modal dismiss events.
     */
    previousComponentId: null,
    /**
     * Custom navigation command emitted on each action.
     */
    commandType: null,
  }

  @action
  updateNavigationStatus(status: Partial<NavigationStatus>) {
    this.status = {
      ...this.status,
      ...status,
    }
  }

  /**
   * A wrapper for Navigation.setRoot.
   */
  @action
  setRoot(layout: LayoutRoot) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SET_ROOT',
    })
    return Navigation.setRoot(layout)
  }

  /**
   * A wrapper for Navigation.setStackRoot.
   */
  @action
  setStackRoot<P>(toId: string, layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SET_NEW_STACK_ROOT',
    })
    return Navigation.setStackRoot(toId, layout)
  }

  /**
   * A wrapper for Navigation.push.
   */
  @action
  push<P>(toId: string, layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'PUSH',
    })
    return Navigation.push(toId, layout)
  }

  /**
   * A wrapper for Navigation.pop.
   */
  @action
  pop(onId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP',
    })
    return Navigation.pop(onId, mergeOptions)
  }

  /**
   * A wrapper for Navigation.popTo.
   */
  @action
  popTo(toId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP_TO',
    })
    return Navigation.popTo(toId, mergeOptions)
  }

  /**
   * A wrapper for Navigation.popToRoot.
   */
  @action
  popToRoot(onId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP_TO_ROOT',
    })
    return Navigation.popToRoot(onId, mergeOptions)
  }

  /**
   * A wrapper for Navigation.showModal.
   */
  @action
  showModal<P>(layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SHOW_MODAL',
    })
    return Navigation.showModal(layout)
  }

  /**
   * A wrapper for Navigation.dismissModal.
   */
  @action
  dismissModal(onId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'DISMISS_MODAL',
    })
    return Navigation.dismissModal(onId, mergeOptions)
  }

  /**
   * A wrapper for Navigation.dismissAllModals.
   */
  @action
  dismissAllModals(mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'DISMISS_ALL_MODALS',
    })
    return Navigation.dismissAllModals(mergeOptions)
  }

  /**
   * A wrapper for Navigation.showOverlay.
   *
   * Only supports a single component layout as stack layout could cause complications when
   * tracking the current componentId.
   */
  @action
  showOverlay<P>(props: NavigationProps<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SHOW_OVERLAY',
    })
    return Navigation.showOverlay(NavigationUtility.setLayoutComponent(props))
  }

  /**
   * A wrapper for Navigation.dismissOverlay.
   */
  @action
  dismissOverlay(onId: string) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'DISMISS_OVERLAY',
    })
    return Navigation.dismissOverlay(onId)
  }
}

export const navigationStore = new NavigationStore()
export const NavigationStoreContext = createContext(navigationStore)
export const useNavigationStore = () => useContext(NavigationStoreContext)
