import React from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '../../../lib'
import { Text } from 'react-native'

export type NavigationStatusProps = {}

export const NavigationStatus: React.FC<NavigationStatusProps> = observer(
  function NavigationStatus() {
    const { status } = useNavigation()

    return (
      <>
        <View style={styles.wrapper}>
          <HighlightValue title="Tracked current" value={status.currentComponentId} />
          <HighlightValue title="Tracked previous" value={status.previousComponentId} />
          <HighlightValue title="Updating" value={status.updating} />
          <HighlightValue title="Command type" value={status.commandType} />
        </View>

        <View style={styles.wrapper}>
          <HighlightValue
            title="Previous stack componentIds"
            value={JSON.stringify(status.previousStackComponentIds)}
          />
        </View>
      </>
    )
  }
)

function HighlightValue({ title, value }: { title: string; value: string | boolean | null }) {
  return (
    <Text style={styles.text}>
      <Text>{`${title}: `}</Text>
      <Text style={styles.valueText}>{`${value}`}</Text>
    </Text>
  )
}

type Style = {
  wrapper: ViewStyle
  text: TextStyle
  valueText: TextStyle
}

const styles = StyleSheet.create<Style>({
  wrapper: {
    marginTop: 10,
  },
  text: {
    fontSize: 14,
  },
  valueText: {
    color: '#4a1dd1',
  },
})
