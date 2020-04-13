import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'

import { NavigationActions } from './NavigationActions'
import { NavigationStatus } from './NavigationStatus'
import { RootType } from './types'

export type StackModalProps = {}

export const StackModal: RootType<StackModalProps> = ({ componentId }) => {
  return (
    <View style={styles.wrapper}>
      <NavigationActions />

      <View style={styles.container}>
        <Text style={styles.text}>Name: Stack Layout Modal</Text>
        <Text style={styles.text}>{`Current: ${componentId}`}</Text>
      </View>

      <NavigationStatus />
    </View>
  )
}

StackModal.options = {
  topBar: {
    title: {
      text: 'Stack Layout Modal',
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
