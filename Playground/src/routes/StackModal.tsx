import React from 'react'
import { StyleSheet, ViewStyle, View, Text, TextStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '../../../lib'

import { Component } from './Component'
import { RootType } from './types'

export type StackModalProps = {}

export const StackModal: RootType<StackModalProps> = observer(({ componentId }) => {
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
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  container: {
    marginTop: 10,
  },
})
