import React from 'react'
import { StyleSheet, ViewStyle, View, Text, Button, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation, NavigationUtility } from 'use-react-native-navigation'

import { Screen1Props } from './Screen1'
import { Screen2Props } from './Screen2'
import { Modal2Props } from './Modal2'
import { Overlay1Props } from './Overlay1'
import { Overlay2Props } from './Overlay2'

import { Screens } from './routes'
import { RootType } from './types'

export type Modal1Props = {}

export const Modal1: RootType<Modal1Props> = observer(({ componentId }) => {
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

Modal1.options = {
  topBar: {
    title: {
      text: 'Modal 1',
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
