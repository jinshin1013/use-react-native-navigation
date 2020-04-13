import { Layout, Options } from 'react-native-navigation'
import { useNavigationStore } from './navigation.store'

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
