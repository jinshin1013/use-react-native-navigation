import { useNavigationStore, NavigationCommandType } from './navigation.store'
import {
  useComponentDidAppear,
  useComponentDidDisappear,
  useModalDismissed,
} from './useNavigationEvent'

/** A list of commands to ignore for ComponentDidAppear event. */
const componentDidAppearCommandBlacklist: NavigationCommandType[] = [
  'MANUAL_DISMISS_ALL_MODALS',
  'MANUAL_DISMISS_MODAL',
  'DISMISS_OVERLAY',
]

/** A list of commands to ignore for ModalDismissed event. */
const modalDismissedCommandBlacklist: NavigationCommandType[] = [
  'MANUAL_DISMISS_MODAL',
  'MANUAL_DISMISS_ALL_MODALS',
]

/**
 * ### Use Track Navigation
 *
 * Set up the event Navigation event listeners to track the current componentId.
 */
export const useTrackNavigation = (passedComponentId: string) => {
  const { status, updateNavigationStatus, onPreviousStackComponentShown } = useNavigationStore()

  /**
   * Component appear event listener.
   *
   * Run:
   * 1. Set previous componentId to the currently set componentId.
   * 2. Set current componentId to the incoming componentId.
   */
  useComponentDidAppear(({ componentId, componentType }) => {
    if (componentType !== 'Component') return

    const incomingComponentId = componentId
    const currentComponentId = status.currentComponentId

    if (componentDidAppearCommandBlacklist.includes(status.commandType as NavigationCommandType)) {
      return
    }

    /**
     * When Modal or Overlay is shown, need to add the previous componentId to the previousStackComponentIds.
     */
    if (status.commandType === 'SHOW_MODAL' || status.commandType === 'SHOW_OVERLAY') {
      updateNavigationStatus({
        currentComponentId: incomingComponentId,
        previousComponentId: currentComponentId,
        updating: false,
        previousStackComponentIds: [...status.previousStackComponentIds, currentComponentId].filter(
          (i): i is string => !!i
        ),
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
  }, passedComponentId)

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
  useComponentDidDisappear(({ componentType }) => {
    if (componentType !== 'Component') return

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
  }, passedComponentId)

  /**
   * Modal dismiss event listener.
   */
  useModalDismissed(() => {
    if (modalDismissedCommandBlacklist.includes(status.commandType as NavigationCommandType)) {
      return
    }

    // This will only run when Android hardware back button is pressed.
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
  }, passedComponentId)
}
