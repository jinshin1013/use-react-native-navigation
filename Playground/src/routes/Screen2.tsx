import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'

import { NavigationActions } from './NavigationActions'
import { RootType } from './types'
import { NavigationStatus } from './NavigationStatus'

export type Screen2Props = {}

export const Screen2: RootType<Screen2Props> = ({ componentId }) => {
  return (
    <View style={styles.wrapper}>
      <NavigationActions />

      <View style={styles.container}>
        <Text style={styles.text}>Name: Screen 2</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
      </View>

      <NavigationStatus />
    </View>
  )
}

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
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
  },
  container: {
    marginTop: 20,
  },
})
