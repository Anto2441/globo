import { router } from 'expo-router'
import { useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  Easing,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const EMOJIS = ['🌍', '🧭', '🗺️', '🌋', '🐘']

function FloatingEmoji({ emoji, index }: { emoji: string; index: number }) {
  const translateY = useSharedValue(0)

  useEffect(() => {
    translateY.value = withDelay(
      index * 300,
      withRepeat(
        withSequence(
          withTiming(-12, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          withTiming(12, { duration: 1400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    )
  }, [index, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View entering={FadeInDown.delay(600 + index * 150).springify()}>
      <Animated.Text style={[{ fontSize: 40 }, animatedStyle]}>{emoji}</Animated.Text>
    </Animated.View>
  )
}

export default function HomeScreen() {
  const buttonScale = useSharedValue(1)

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.92)
  }

  const handlePressOut = () => {
    buttonScale.value = withSpring(1)
  }

  return (
    <View className="flex-1 items-center justify-center bg-brand-50 px-8">
      <Animated.Text
        style={{
          height: 80,
          fontSize: 64,
          color: '#1A73E8',
          fontFamily: 'Fredoka_600SemiBold',
          textShadowColor: 'rgba(26, 115, 232, 0.15)',
          textShadowOffset: { width: 0, height: 4 },
          textShadowRadius: 8,
          marginBottom: 24,
        }}
      >
        Globo
      </Animated.Text>

      <View className="mb-8 flex-row gap-4">
        {EMOJIS.map((emoji, i) => (
          <FloatingEmoji key={emoji} emoji={emoji} index={i} />
        ))}
      </View>

      <Animated.Text
        entering={FadeInDown.delay(400).duration(600).springify()}
        className="mb-12 text-center font-nunito-semibold text-xl"
        style={{ color: '#3A3A3A', lineHeight: 32 }}
      >
        Pars à la découverte{'\n'}du monde entier !
      </Animated.Text>

      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push('/continent/europe')}
        className="rounded-3xl bg-brand-500 px-12"
        style={[
          {
            paddingVertical: 18,
            paddingHorizontal: 48,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#1A73E8',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 12,
            elevation: 8,
          },
          buttonAnimatedStyle,
        ]}
      >
        <Text
          className="text-2xl text-white font-fredoka-semibold tracking-wider"
          style={{ lineHeight: undefined }}
        >
          Jouer ! 🚀
        </Text>
      </AnimatedPressable>
    </View>
  )
}
