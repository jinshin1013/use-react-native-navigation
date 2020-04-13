import { useLayoutEffect, useCallback } from 'react'
import { Navigation } from 'react-native-navigation'
import { useNavigationStore } from './navigation.store'

/**
 * ### Use Track Navigation
 *
 * Set up the event Navigation event listeners to track the current componentId.
 */
export const useTrackNavigation = (passedComponentId: string) => {
  const { status, updateNavigationStatus } = useNavigationStore()

  const onAllStackComponentsDismissed = useCallback((stackList: string[]) => {
    if (stackList.length === 0) {
      throw new Error('There is no previous stack.')
    }

    return stackList[0]
  }, [])

  const onPreviousStackComponentShown = useCallback((stackList: string[]) => {
    if (stackList.length === 0) {
      throw new Error('There is no previous stack.')
    }

    const lastStackComponentId = stackList[stackList.length - 1]
    const updatedStackList = stackList.slice(0, -1)

    return {
      lastStackComponentId,
      updatedStackList,
    }
  }, [])

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
        if (componentId !== passedComponentId) return

        const incomingComponentId = componentId
        const currentComponentId = status.currentComponentId

        /**
         * When Modal or Overlay is shown, need to add the previous componentId to the previousStackComponentIds.
         */
        if (status.commandType === 'SHOW_MODAL' || status.commandType === 'SHOW_OVERLAY') {
          updateNavigationStatus({
            currentComponentId: incomingComponentId,
            previousComponentId: currentComponentId,
            updating: false,
            previousStackComponentIds: [
              ...status.previousStackComponentIds,
              currentComponentId,
            ].filter((i): i is string => !!i),
            commandType: null,
          })
          return
        }

        updateNavigationStatus({
          currentComponentId: incomingComponentId,
          previousComponentId: currentComponentId,
          updating: false,
          commandType: null,
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
        if (componentId !== passedComponentId) return

        if (status.commandType === 'DISMISS_OVERLAY') {
          const { lastStackComponentId, updatedStackList } = onPreviousStackComponentShown(
            status.previousStackComponentIds
          )

          updateNavigationStatus({
            currentComponentId: lastStackComponentId ?? null,
            previousStackComponentIds: updatedStackList,
            previousComponentId: null,
            updating: false,
            commandType: null,
          })
        }
      }
    )

    /**
     * Modal dismiss event listener.
     */
    const modalDismissEvent = Navigation.events().registerModalDismissedListener(
      ({ componentId }) => {
        if (componentId !== passedComponentId) return

        /**
         * When dismissing all modals, grab the first componentId in the stack list
         * then reset the stack list.
         */
        if (status.commandType === 'DISMISS_ALL_MODALS') {
          const firstStackComponentId = onAllStackComponentsDismissed(
            status.previousStackComponentIds
          )

          updateNavigationStatus({
            currentComponentId: firstStackComponentId,
            previousStackComponentIds: [],
            previousComponentId: null,
            updating: false,
            commandType: null,
          })
          return
        }

        const { lastStackComponentId, updatedStackList } = onPreviousStackComponentShown(
          status.previousStackComponentIds
        )

        updateNavigationStatus({
          currentComponentId: lastStackComponentId,
          previousStackComponentIds: updatedStackList,
          previousComponentId: null,
          updating: false,
          commandType: null,
        })
      }
    )

    return () => {
      appearEvent.remove()
      disappearEvent.remove()
      modalDismissEvent.remove()
    }
  }, [
    status,
    updateNavigationStatus,
    onPreviousStackComponentShown,
    onAllStackComponentsDismissed,
    passedComponentId,
  ])
}
