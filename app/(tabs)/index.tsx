import { useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  Easing,
  FadeInDown,
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
      <Animated.Text style={[styles.emoji, animatedStyle]}>{emoji}</Animated.Text>
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
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(600).springify()} style={styles.title}>
        Globo
      </Animated.Text>

      <View style={styles.emojiRow}>
        {EMOJIS.map((emoji, i) => (
          <FloatingEmoji key={emoji} emoji={emoji} index={i} />
        ))}
      </View>

      <Animated.Text
        entering={FadeInDown.delay(400).duration(600).springify()}
        style={styles.subtitle}
      >
        Pars à la découverte{'\n'}du monde entier !
      </Animated.Text>

      <AnimatedPressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, buttonAnimatedStyle]}
      >
        <Text style={styles.buttonText}>Jouer ! 🚀</Text>
      </AnimatedPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 64,
    color: '#1A73E8',
    marginBottom: 24,
    textShadowColor: 'rgba(26, 115, 232, 0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  emojiRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  emoji: {
    fontSize: 40,
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 22,
    color: '#3A3A3A',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 28,
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontFamily: 'Fredoka_600SemiBold',
    fontSize: 26,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
})
