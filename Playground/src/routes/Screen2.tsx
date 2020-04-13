import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '../../../lib'

import { Component } from './Component'
import { RootType } from './types'

export type Screen2Props = {}

export const Screen2: RootType<Screen2Props> = observer(({ componentId }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <Component />

      <View style={styles.container}>
        <Text style={styles.text}>Screen 1</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
        <Text style={styles.text}>{`Registered: ${navigation.status.currentComponentId}`}</Text>
        <Text style={styles.text}>{`Updating: ${navigation.status.updating}`}</Text>
      </View>
    </View>
  )
})

Screen2.options = {
  topBar: {
    title: {
      text: 'Screen 2',
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
