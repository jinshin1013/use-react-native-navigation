import { createContext, useContext } from 'react'
import { Navigation, Options, Layout, LayoutRoot } from 'react-native-navigation'
import { observable, action } from 'mobx'

import { NavigationUtility, NavigationProps } from './utility'

export type NavigationCommandType =
  | 'SET_ROOT'
  | 'SET_NEW_STACK_ROOT'
  | 'PUSH'
  | 'POP'
  | 'POP_TO'
  | 'POP_TO_ROOT'
  | 'SHOW_MODAL'
  | 'MANUAL_DISMISS_MODAL'
  | 'MANUAL_DISMISS_ALL_MODALS'
  | 'SHOW_OVERLAY'
  | 'DISMISS_OVERLAY'

export type NavigationStatus = {
  /**
   * Whether the current componentId is still being set.
   * There may be some delay in setting the latest componentId as
   * it relies on `componentDidAppear` and `componentDidDisappear` events.
   */
  updating: boolean
  /**
   * Current componentId visible to the user.
   */
  currentComponentId: null | string
  /**
   * Previous componentId that was visible to the user.
   * This is useful for overlay and modal dismiss events.
   */
  previousComponentId: null | string
  /**
   * When modal is shown, save the componentId of the
   * visible screen.
   */
  previousStackComponentIds: string[]
  /**
   * Custom navigation command emitted on each action.
   */
  commandType: NavigationCommandType | null
}

export class NavigationStore {
  @observable status: NavigationStatus = {
    updating: false,
    currentComponentId: null,
    previousComponentId: null,
    previousStackComponentIds: [],
    commandType: null,
  }

  @action.bound
  updateNavigationStatus(status: Partial<NavigationStatus>) {
    this.status = {
      ...this.status,
      ...status,
    }
  }

  /**
   * A wrapper for Navigation.setRoot.
   */
  @action.bound
  setRoot(layout: LayoutRoot) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SET_ROOT',
    })
    return Navigation.setRoot(layout).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.setStackRoot.
   */
  @action.bound
  setStackRoot<P>(toId: string, layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SET_NEW_STACK_ROOT',
    })
    return Navigation.setStackRoot(toId, layout).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.push.
   */
  @action.bound
  push<P>(toId: string, layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'PUSH',
    })
    return Navigation.push(toId, layout).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.pop.
   */
  @action.bound
  pop(onId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP',
    })
    return Navigation.pop(onId, mergeOptions).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.popTo.
   */
  @action.bound
  popTo(toId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP_TO',
    })
    return Navigation.popTo(toId, mergeOptions).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.popToRoot.
   */
  @action.bound
  popToRoot(onId: string, mergeOptions?: Options) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'POP_TO_ROOT',
    })
    return Navigation.popToRoot(onId, mergeOptions).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.showModal.
   * NOTE: Modal should only be shown in Stack layout.
   */
  @action.bound
  showModal<P>(layouts: NavigationProps<P> | NavigationProps<P>[]) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SHOW_MODAL',
    })

    return Navigation.showModal(
      NavigationUtility.setLayoutStackComponents(Array.isArray(layouts) ? layouts : [layouts])
    ).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.dismissModal.
   */
  @action.bound
  dismissModal(onId: string, mergeOptions?: Options) {
    const { lastStackComponentId, updatedStackList } = this.onPreviousStackComponentShown(
      this.status.previousStackComponentIds
    )
    this.updateNavigationStatus({
      currentComponentId: lastStackComponentId,
      previousStackComponentIds: updatedStackList,
      previousComponentId: null,
      updating: true,
      commandType: 'MANUAL_DISMISS_MODAL',
    })
    return Navigation.dismissModal(onId, mergeOptions).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.dismissAllModals.
   */
  @action.bound
  dismissAllModals(mergeOptions?: Options) {
    const firstStackComponentId = this.onAllStackComponentsDismissed(
      this.status.previousStackComponentIds
    )

    this.updateNavigationStatus({
      currentComponentId: firstStackComponentId,
      previousStackComponentIds: [],
      previousComponentId: null,
      updating: true,
      commandType: 'MANUAL_DISMISS_ALL_MODALS',
    })
    return Navigation.dismissAllModals(mergeOptions).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.showOverlay.
   */
  @action.bound
  showOverlay<P>(layout: Layout<P>) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'SHOW_OVERLAY',
    })
    return Navigation.showOverlay(layout).catch(this.handleNavigationError)
  }

  /**
   * A wrapper for Navigation.dismissOverlay.
   */
  @action.bound
  dismissOverlay(onId: string) {
    this.updateNavigationStatus({
      updating: true,
      commandType: 'DISMISS_OVERLAY',
    })
    return Navigation.dismissOverlay(onId).catch(this.handleNavigationError)
  }

  private handleNavigationError = (e: any) => {
    this.updateNavigationStatus({
      updating: false,
    })
    throw new Error(e)
  }

  onPreviousStackComponentShown(stackList: string[]) {
    if (stackList.length === 0) {
      throw new Error('There is no previous stack. 323900')
    }

    const lastStackComponentId = stackList[stackList.length - 1]
    const updatedStackList = stackList.slice(0, -1)

    return {
      lastStackComponentId,
      updatedStackList,
    }
  }

  onAllStackComponentsDismissed(stackList: string[]) {
    if (stackList.length === 0) {
      throw new Error('There is no previous stack. 120392')
    }

    return stackList[0]
  }
}

export const navigationStore = new NavigationStore()
export const NavigationStoreContext = createContext(navigationStore)
export const useNavigationStore = () => useContext(NavigationStoreContext)
