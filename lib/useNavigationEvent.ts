import { useLayoutEffect } from 'react'
import {
  Navigation,
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  ModalDismissedEvent,
  NavigationButtonPressedEvent,
  ModalAttemptedToDismissEvent,
} from 'react-native-navigation'

/**
 * ### ComponentDidAppear event listener.
 *
 * if targetId is provided, the effect will only run when targetId matches the incoming componentId.
 */
export function useComponentDidAppear(
  effect: (event: ComponentDidAppearEvent) => void,
  targetId?: string
) {
  useLayoutEffect(() => {
    const didAppearEvent = Navigation.events().registerComponentDidAppearListener(
      // @ts-ignore
      runEffectOnScreenTarget(effect, targetId)
    )
    return () => didAppearEvent.remove()
  }, [effect, targetId])
}

/**
 * ### ComponentDidDisappear event listener.
 *
 * if targetId is provided, the effect will only run when targetId matches the incoming componentId.
 */
export function useComponentDidDisappear(
  effect: (event: ComponentDidDisappearEvent) => void,
  targetId?: string
) {
  useLayoutEffect(() => {
    const didDisappearEvent = Navigation.events().registerComponentDidDisappearListener(
      // @ts-ignore
      runEffectOnScreenTarget(effect, targetId)
    )
    return () => didDisappearEvent.remove()
  }, [effect, targetId])
}

/**
 * ### ModalDismissed event listener.
 *
 * if targetId is provided, the effect will only run when targetId matches the incoming componentId.
 */
export function useModalDismissed(effect: (event: ModalDismissedEvent) => void, targetId?: string) {
  useLayoutEffect(() => {
    const modalDismissedEvent = Navigation.events().registerModalDismissedListener(
      // @ts-ignore
      runEffectOnScreenTarget(effect, targetId)
    )
    return () => modalDismissedEvent.remove()
  }, [effect, targetId])
}

/**
 * ### Modal
 */
export function useModalAttemptedToDismiss(
  effect: (event: ModalAttemptedToDismissEvent) => void,
  targetId?: string
) {
  useLayoutEffect(() => {
    const modalAttemptedToDismissEvent = Navigation.events().registerModalAttemptedToDismissListener(
      // @ts-ignore
      runEffectOnScreenTarget(effect, targetId)
    )
    return () => modalAttemptedToDismissEvent.remove()
  })
}

/**
 * ### NavigationButton event listener.
 *
 * if targetButtonId is provided, the effect will only run when targetButtonId matches the incoming buttonId.
 */
export function useNavigationButtonPressed(
  effect: (event: NavigationButtonPressedEvent) => void,
  targetButtonId?: string
) {
  useLayoutEffect(() => {
    const navButtonPressedEvent = Navigation.events().registerNavigationButtonPressedListener(
      runEffectOnComponentTarget(effect, targetButtonId)
    )
    return () => navButtonPressedEvent.remove()
  })
}

type EffectOnTargetScreenEvent =
  | ComponentDidAppearEvent
  | ComponentDidDisappearEvent
  | ModalDismissedEvent
  | ModalAttemptedToDismissEvent

type EffectOnTargetComponentEvent = NavigationButtonPressedEvent

/**
 * Run Effect on Screen Target
 *
 * If targetId is provided, the effect will only run when the targetId matches the event's componentId.
 * Otherwise, the effect will run every time.
 */
function runEffectOnScreenTarget(
  effect: (event: EffectOnTargetScreenEvent) => void,
  targetId?: string
) {
  return function (event: EffectOnTargetScreenEvent) {
    if (!targetId) {
      effect(event)
      return
    }

    if (targetId && event.componentId === targetId) {
      effect(event)
    }
  }
}

/**
 * ### Run Effect on Component target.
 *
 * If targetButtonId is provided, the effect will only run when the targetButtonId matches the event's buttonId.
 * Otherwise, the effect will run every time.
 */
function runEffectOnComponentTarget(
  effect: (event: EffectOnTargetComponentEvent) => void,
  targetButtonId?: string
) {
  return function (event: EffectOnTargetComponentEvent) {
    if (!targetButtonId) {
      effect(event)
      return
    }

    /**
     * If buttonId exists, the event is NavigationButtonPressedEvent.
     */
    if (targetButtonId && 'buttonId' in event && targetButtonId === event.buttonId) {
      effect(event)
      return
    }
  }
}
