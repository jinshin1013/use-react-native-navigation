import { Options } from 'react-native-navigation'

export const defaultOptions: Options = {
  topBar: {
    title: {
      color: 'black',
    },
    largeTitle: {
      color: 'black',
    },
    background: {
      color: 'white',
    },
  },
  layout: {
    componentBackgroundColor: 'white',
  },
  animations: {
    push: { waitForRender: true },
    setRoot: { waitForRender: true },
    setStackRoot: { waitForRender: true },
    showModal: { waitForRender: true },
    dismissModal: { waitForRender: true },
    pop: { waitForRender: true },
  },
}
