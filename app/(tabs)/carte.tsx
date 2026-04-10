import WorldMap from '@/features/map/WorldMap'
import { View } from 'react-native'

export default function CarteScreen() {
  return (
    <View className="flex-1 bg-brand-50">
      <WorldMap />
    </View>
  )
}
