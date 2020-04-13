import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'

import { NavigationActions } from './NavigationActions'
import { NavigationStatus } from './NavigationStatus'
import { RootType } from './types'

export type SingleOverlayProps = {}

export const SingleOverlay: RootType<SingleOverlayProps> = ({ componentId }) => {
  return (
    <View style={styles.wrapper}>
      <NavigationActions />

      <View style={styles.container}>
        <Text style={styles.text}>Name: Single Layout Overlay</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
      </View>

      <NavigationStatus />
    </View>
  )
}

SingleOverlay.options = {
  topBar: {
    title: {
      text: 'Single Layout Overlay',
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
