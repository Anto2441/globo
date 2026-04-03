import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { useEffect } from 'react'

export default function SvgTest() {
  // Reanimated: opacity pulsing animation
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.2, { duration: 800 }), -1, true)
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  // Gesture Handler: tap detection
  const tap = Gesture.Tap().onEnd(() => {
    console.log('[SvgTest] Tap detected ✓')
  })

  return (
    <View className="items-center gap-4 p-6">
      {/* SVG test */}
      <Text className="text-base font-bold">SVG ✓</Text>
      <Svg width={80} height={80}>
        <Circle cx={40} cy={40} r={36} fill="#1A73E8" />
      </Svg>

      {/* Reanimated test */}
      <Text className="text-base font-bold">Reanimated (pulse)</Text>
      <Animated.View style={animatedStyle} className="h-10 w-10 rounded-full bg-green-500" />

      {/* Gesture Handler test */}
      <Text className="text-base font-bold">Gesture Handler (tap)</Text>
      <GestureDetector gesture={tap}>
        <View className="rounded-xl bg-orange-400 px-6 py-3">
          <Text className="text-white font-bold">Tap me</Text>
        </View>
      </GestureDetector>
    </View>
  )
}
