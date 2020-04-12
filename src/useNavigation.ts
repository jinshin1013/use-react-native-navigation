import { useLayoutEffect } from 'react'
import { Navigation, Layout, Options } from 'react-native-navigation'

import { useNavigationStore } from './navigation.store'

/**
 * ### Use Register Navigation Events
 *
 * Set up the event Navigation event listeners to track the current componentId.
 */
export const useRegisterNavigationEvents = (props: { componentId: string }) => {
  const navigationStore = useNavigationStore()

  useLayoutEffect(() => {
    /**
     * Component appear event listener.
     *
     * Run:
     * 1. Set previous componentId to the currently set componentId.
     * 2. Set current componentId to the incoming componentId.
     */
    const appearEvent = Navigation.events().registerComponentDidAppearListener(
      ({ componentId, componentType }) => {
        if (componentType !== 'Component') return
        if (componentId !== props.componentId) return

        navigationStore.updateNavigationStatus({
          previousComponentId: navigationStore.status.currentComponentId,
          currentComponentId: componentId,
          updating: false,
        })
      }
    )

    /**
     * Component disappear event listener.
     *
     * ONLY RUNS when dismissing an overlay as dismissing overlay does not trigger appear event of
     * the current screen.
     *
     * This procedure assumes that the overlay is only a single layout.
     *
     * Run:
     * 1. Set current componentId to the previously set componentId.
     * 2. Set previous componentId to null.
     *
     */
    const disappearEvent = Navigation.events().registerComponentDidDisappearListener(
      ({ componentId, componentType }) => {
        if (componentType !== 'Component') return
        if (componentId !== props.componentId) return

        if (navigationStore.status.commandType === 'DISMISS_OVERLAY') {
          navigationStore.updateNavigationStatus({
            currentComponentId: navigationStore.status.previousComponentId,
            previousComponentId: null,
            updating: false,
          })
        }
      }
    )

    /**
     * Modal dismiss event listener.
     *
     * TEST if this is needed or appear event is suffice.
     */
    // const modalDismissEvent = Navigation.events().registerModalDismissedListener(
    //   ({ componentId }) => {
    //     if (componentId !== props.componentId) return

    //     navigationStore.updateNavigationStatus({
    //       currentComponentId: navigationStore.status.previousComponentId,
    //       previousComponentId: null,
    //       updating: false,
    //     })
    //   }
    // )

    return () => {
      appearEvent.remove()
      disappearEvent.remove()
      // modalDismissEvent.remove()
    }
  }, [navigationStore, props.componentId])
}

export const useNavigation = () => {
  const {
    status,
    setRoot,
    setStackRoot,
    push,
    pop,
    popTo,
    popToRoot,
    showOverlay,
    dismissOverlay,
    showModal,
    dismissAllModals,
    dismissModal,
  } = useNavigationStore()

  return {
    status,
    push: <P>(layout: Layout<P>) => {
      if (!status.currentComponentId) {
        throw new Error('Missing component id.')
      }
      return push(status.currentComponentId, layout)
    },
    pop: (mergeOptions?: Options) => {
      if (!status.currentComponentId) {
        throw new Error('Missing component id.')
      }
      return pop(status.currentComponentId, mergeOptions)
    },
    dismissModal: (mergeOptions?: Options) => {
      if (!status.currentComponentId) {
        throw new Error('Missing component id.')
      }
      return dismissModal(status.currentComponentId, mergeOptions)
    },
    dismissOverlay: () => {
      if (!status.currentComponentId) {
        throw new Error('Missing component id.')
      }
      return dismissOverlay(status.currentComponentId)
    },
    setRoot,
    setStackRoot,
    popTo,
    popToRoot,
    showModal,
    showOverlay,
    dismissAllModals,
  }
}
