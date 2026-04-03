import { ScrollView, Text } from 'react-native'
import SvgTest from '@/components/test/SvgTest'

export default function CarteScreen() {
  return (
    <ScrollView className="flex-1 bg-brand-50" contentContainerClassName="items-center justify-center py-12">
      <Text
        style={{
          fontSize: 48,
          fontFamily: 'Fredoka_600SemiBold',
          color: '#1A73E8',
          marginBottom: 24,
        }}
      >
        Carte
      </Text>
      <SvgTest />
    </ScrollView>
  )
}
