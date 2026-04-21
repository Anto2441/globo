import { CONTINENT_CONFIG } from '@/constants/continentConfig'
import { COUNTRY_CONTINENTS, type ContinentKey } from '@/constants/countryContinents'
import { WORLD_PATHS } from '@/constants/worldPaths'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Pressable, View, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Svg, { G, Path } from 'react-native-svg'

const VIEWBOX_WIDTH = 2000
const VIEWBOX_HEIGHT = 857

// Group paths by continent at module level (computed once)
const continentPaths = Object.keys(CONTINENT_CONFIG).reduce<Record<ContinentKey, string[]>>(
  (acc, key) => {
    acc[key as ContinentKey] = []
    return acc
  },
  {} as Record<ContinentKey, string[]>
)

for (const { id, d } of WORLD_PATHS) {
  const continent = COUNTRY_CONTINENTS[id]
  if (continent) {
    continentPaths[continent].push(d)
  }
}

const CONTINENT_KEYS = Object.keys(CONTINENT_CONFIG) as ContinentKey[]

function clamp(value: number, min: number, max: number) {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

export default function WorldMap() {
  const [activeContinent, setActiveContinent] = useState<ContinentKey | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isGestureActive, setIsGestureActive] = useState(false)
  const { width: screenWidth } = useWindowDimensions()

  // Label animation
  const opacity = useSharedValue(0)
  const labelScale = useSharedValue(0.8)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Map transform
  const mapScale = useSharedValue(1)
  const mapTranslateX = useSharedValue(0)
  const mapTranslateY = useSharedValue(0)
  const savedScale = useSharedValue(1)
  const savedTranslateX = useSharedValue(0)
  const savedTranslateY = useSharedValue(0)

  const svgHeight = screenWidth > 0 ? (screenWidth / VIEWBOX_WIDTH) * VIEWBOX_HEIGHT : 0
  const svgHeightSV = useSharedValue(svgHeight)

  // Sync svgHeightSV after render, not during (avoids reading .value in render phase)
  useEffect(() => {
    svgHeightSV.value = svgHeight
  }, [svgHeight, svgHeightSV])

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: labelScale.value }],
  }))

  const mapAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: mapTranslateX.value },
      { translateY: mapTranslateY.value },
      { scale: mapScale.value },
    ],
  }))

  const handleTap = useCallback(
    (continent: ContinentKey) => {
      if (timerRef.current) clearTimeout(timerRef.current)

      setActiveContinent(continent)
      opacity.value = withTiming(1, { duration: 200 })
      labelScale.value = withTiming(1, { duration: 200 })

      timerRef.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 })
      }, 3000)
    },
    [opacity, labelScale]
  )

  const handleReset = useCallback(() => {
    mapTranslateX.value = withSpring(0)
    mapTranslateY.value = withSpring(0)
    mapScale.value = withSpring(1, {}, () => runOnJS(setIsZoomed)(false))
  }, [mapScale, mapTranslateX, mapTranslateY])

  const pinchGesture = Gesture.Pinch()
    .onStart((e) => {
      'worklet'
      savedScale.value = mapScale.value
      savedTranslateX.value = mapTranslateX.value
      savedTranslateY.value = mapTranslateY.value
      runOnJS(setIsGestureActive)(true)
    })
    .onUpdate((e) => {
      'worklet'
      const newScale = clamp(savedScale.value * e.scale, 1, 4)

      // Zoom toward pinch focal point
      const localFocalX = (e.focalX - screenWidth / 2 - savedTranslateX.value) / savedScale.value
      const localFocalY =
        (e.focalY - svgHeightSV.value / 2 - savedTranslateY.value) / savedScale.value
      const rawTx = e.focalX - screenWidth / 2 - localFocalX * newScale
      const rawTy = e.focalY - svgHeightSV.value / 2 - localFocalY * newScale

      const maxX = (screenWidth * (newScale - 1)) / 2
      const maxY = (svgHeightSV.value * (newScale - 1)) / 2

      mapScale.value = newScale
      mapTranslateX.value = clamp(rawTx, -maxX, maxX)
      mapTranslateY.value = clamp(rawTy, -maxY, maxY)
    })
    .onEnd(() => {
      'worklet'
      runOnJS(setIsZoomed)(mapScale.value > 1)
      runOnJS(setIsGestureActive)(false)
    })

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet'
      savedTranslateX.value = mapTranslateX.value
      savedTranslateY.value = mapTranslateY.value
      runOnJS(setIsGestureActive)(true)
    })
    .onUpdate((e) => {
      'worklet'
      const maxX = (screenWidth * (mapScale.value - 1)) / 2
      const maxY = (svgHeightSV.value * (mapScale.value - 1)) / 2

      mapTranslateX.value = clamp(savedTranslateX.value + e.translationX, -maxX, maxX)
      mapTranslateY.value = clamp(savedTranslateY.value + e.translationY, -maxY, maxY)
    })
    .onEnd(() => {
      'worklet'
      runOnJS(setIsGestureActive)(false)
    })

  const composed = Gesture.Simultaneous(pinchGesture, panGesture)

  const tapsEnabled = !isZoomed && !isGestureActive

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="w-full relative">
        <GestureDetector gesture={composed}>
          <Animated.View style={mapAnimatedStyle}>
            <Svg
              width={screenWidth}
              height={svgHeight}
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {CONTINENT_KEYS.map((continent) => {
                const config = CONTINENT_CONFIG[continent]
                return (
                  <G key={continent} onPress={tapsEnabled ? () => handleTap(continent) : undefined}>
                    {continentPaths[continent].map((d, i) => (
                      <Path key={i} d={d} fill={config.color} stroke="#ffffff" strokeWidth={0.5} />
                    ))}
                  </G>
                )
              })}
            </Svg>
          </Animated.View>
        </GestureDetector>

        {/* Label overlay — fixed on screen, does not move with the map */}
        {activeContinent && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: `${(CONTINENT_CONFIG[activeContinent].anchor.x / 2000) * 100}%`,
                top: `${(CONTINENT_CONFIG[activeContinent].anchor.y / 857) * 100}%`,
              },
              labelStyle,
            ]}
            className="rounded-2xl bg-white/90 px-4 py-2 shadow-md"
            pointerEvents="none"
          >
            <Animated.Text
              className="font-fredoka-semibold text-2xl"
              style={{ color: CONTINENT_CONFIG[activeContinent].color, lineHeight: undefined }}
            >
              {CONTINENT_CONFIG[activeContinent].label}
            </Animated.Text>
          </Animated.View>
        )}

        {/* Reset FAB — visible when zoomed */}
        {isZoomed && (
          <Pressable
            onPress={handleReset}
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center"
          >
            <Animated.Text className="text-2xl text-gray-600">↺</Animated.Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}
