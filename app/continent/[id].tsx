import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { IconSymbol } from '@/components/ui/icon-symbol'

export default function ContinentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="flex-1 bg-brand-50">
      <Pressable
        onPress={() => router.back()}
        className="absolute left-5 top-14 z-10 p-2"
        hitSlop={16}
      >
        <IconSymbol name="chevron.right" size={32} color="#1A73E8" style={{ transform: [{ scaleX: -1 }] }} />
      </Pressable>

      <View className="flex-1 items-center justify-center">
        <Text
          style={{
            fontSize: 48,
            fontFamily: 'Fredoka_600SemiBold',
            color: '#1A73E8',
          }}
        >
          Continent : {id}
        </Text>
      </View>
    </View>
  )
}
