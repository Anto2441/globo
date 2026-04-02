import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function AnimalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="flex-1 items-center justify-center bg-brand-50">
      <Text
        style={{
          fontSize: 48,
          fontFamily: 'Fredoka_600SemiBold',
          color: '#1A73E8',
        }}
      >
        Animal : {id}
      </Text>
    </View>
  )
}
