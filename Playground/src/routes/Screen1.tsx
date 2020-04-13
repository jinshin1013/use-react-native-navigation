import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'

import { NavigationActions } from './NavigationActions'
import { NavigationStatus } from './NavigationStatus'
import { RootType } from './types'

export type Screen1Props = {}

export const Screen1: RootType<Screen1Props> = ({ componentId }) => {
  return (
    <View style={styles.wrapper}>
      <NavigationActions />

      <View style={styles.container}>
        <Text style={styles.text}>Name: Screen 1</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
      </View>

      <NavigationStatus />
    </View>
  )
}

Screen1.options = {
  topBar: {
    title: {
      text: 'Screen 1',
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
