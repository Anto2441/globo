import { CONTINENT_CONFIG } from '@/constants/continentConfig'
import { COUNTRY_CONTINENTS, type ContinentKey } from '@/constants/countryContinents'
import { WORLD_PATHS } from '@/constants/worldPaths'
import { useCallback, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { G, Path } from 'react-native-svg'

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

export default function WorldMap() {
  const [activeContinent, setActiveContinent] = useState<ContinentKey | null>(null)
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const labelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const handleTap = useCallback(
    (continent: ContinentKey) => {
      if (timerRef.current) clearTimeout(timerRef.current)

      setActiveContinent(continent)
      opacity.value = withTiming(1, { duration: 200 })
      scale.value = withTiming(1, { duration: 200 })

      timerRef.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 })
      }, 3000)
    },
    [opacity, scale]
  )

  return (
    <View className="flex-1">
      <Svg width="100%" height="100%" viewBox="0 0 2000 857" preserveAspectRatio="xMidYMid meet">
        {CONTINENT_KEYS.map((continent) => {
          const config = CONTINENT_CONFIG[continent]
          return (
            <G key={continent} onPress={() => handleTap(continent)}>
              {continentPaths[continent].map((d, i) => (
                <Path key={i} d={d} fill={config.color} stroke="#ffffff" strokeWidth={0.5} />
              ))}
            </G>
          )
        })}
      </Svg>

      {/* Animated label overlay */}
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
    </View>
  )
}
