import React from 'react'
import { StyleSheet, ViewStyle, View, Text, Button, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation, NavigationUtility } from '../../../lib'

import { Screen1Props } from './Screen1'
import { Screen2Props } from './Screen2'
import { Modal1Props } from './Modal1'
import { Modal2Props } from './Modal2'
import { Overlay1Props } from './Overlay1'

import { Screens } from './routes'
import { RootType } from './types'

export type Overlay2Props = {}

export const Overlay2: RootType<Overlay2Props> = observer(({ componentId }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <Button
        title="Push to Screen 1"
        onPress={() =>
          navigation.push(
            NavigationUtility.setLayoutComponent<Screen1Props>({ name: Screens.Screen1 })
          )
        }
      />
      <Button
        title="Push to Screen 2"
        onPress={() =>
          navigation.push(
            NavigationUtility.setLayoutComponent<Screen2Props>({ name: Screens.Screen2 })
          )
        }
      />

      <Button
        title="Show Modal 1"
        onPress={() =>
          navigation.showModal(
            NavigationUtility.setLayoutStackComponents<Modal1Props>([{ name: Screens.Modal1 }])
          )
        }
      />
      <Button
        title="Show Modal 2"
        onPress={() =>
          navigation.showModal(
            NavigationUtility.setLayoutStackComponents<Modal2Props>([{ name: Screens.Modal2 }])
          )
        }
      />

      <Button
        title="Show Overlay 1"
        onPress={() => navigation.showOverlay<Overlay1Props>({ name: Screens.Overlay1 })}
      />
      <Button
        title="Show Overlay 2"
        onPress={() => navigation.showOverlay<Overlay2Props>({ name: Screens.Overlay2 })}
      />

      <Button title="Dismiss modal" onPress={() => navigation.dismissModal()} />
      <Button title="Dismiss overlay" onPress={() => navigation.dismissOverlay()} />

      <View style={styles.container}>
        <Text style={styles.text}>Screen 1</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
        <Text style={styles.text}>{`Registered: ${navigation.status.currentComponentId}`}</Text>
        <Text style={styles.text}>{`Updating: ${navigation.status.updating}`}</Text>
      </View>
    </View>
  )
})

Overlay2.options = {
  topBar: {
    title: {
      text: 'Overlay 2',
    },
  },
}

interface Style {
  wrapper: ViewStyle
  text: TextStyle
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  container: {
    marginTop: 10,
  },
})
