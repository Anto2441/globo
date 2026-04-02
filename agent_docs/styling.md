# Styling

## Rules

- Always use NativeWind `className` — never use `StyleSheet` or inline style props
- Exception: Reanimated `useAnimatedStyle` returns a style object — combine with `className` via the `style` prop
- Never use arbitrary Tailwind values unless no semantic token exists
- Font families must match exactly the loaded weights (see Typography below)
- Prefer semantic tokens (`bg-brand-500`) over raw hex values

## Theme tokens

All tokens are defined in `tailwind.config.js`. Reference them here.

### Colors — Brand

Primary blue palette, used for headers, buttons, backgrounds.

| Token       | Hex     | Usage                         |
| ----------- | ------- | ----------------------------- |
| `brand-50`  | #E8F4FD | Light background, screen bg   |
| `brand-100` | #C5E3F9 | Subtle highlights             |
| `brand-200` | #8EC8F3 | Hover / pressed states        |
| `brand-300` | #57ADEC | Secondary accents             |
| `brand-400` | #2B95E4 | Links, interactive            |
| `brand-500` | #1A73E8 | **Primary** — buttons, titles |
| `brand-600` | #155CBB | Pressed buttons               |
| `brand-700` | #10458D | Dark accents                  |
| `brand-800` | #0B2E5E | Very dark                     |
| `brand-900` | #061730 | Near-black                    |

### Colors — Continents

Each continent has three shades: `light`, DEFAULT, `dark`.

| Continent     | Token prefix | Light   | Default | Dark    | Mood        |
| ------------- | ------------ | ------- | ------- | ------- | ----------- |
| Africa        | `africa`     | #FFF3E0 | #FFB74D | #F57C00 | Warm orange |
| Europe        | `europe`     | #E3F2FD | #42A5F5 | #1565C0 | Blue        |
| North America | `northam`    | #FBE9E7 | #FF7043 | #D84315 | Deep orange |
| South America | `southam`    | #E8F5E9 | #66BB6A | #2E7D32 | Green       |
| Asia          | `asia`       | #FFFDE7 | #FFEE58 | #F9A825 | Yellow      |
| Oceania       | `oceania`    | #F3E5F5 | #AB47BC | #7B1FA2 | Purple      |
| Antarctica    | `antarctica` | #FAFAFA | #E0E0E0 | #9E9E9E | Grey/white  |

Usage examples:

```tsx
// Continent card background
<View className="bg-africa-light rounded-3xl p-6">
  <Text className="text-africa-dark font-fredoka-semibold text-2xl">Afrique</Text>
</View>

// Continent badge
<View className="bg-europe rounded-bubble px-4 py-2">
  <Text className="text-white font-nunito-semibold">Europe</Text>
</View>
```

### Typography — Font families

| className               | Font loaded         | Use for                    |
| ----------------------- | ------------------- | -------------------------- |
| `font-fredoka`          | Fredoka_400Regular  | Decorative text, labels    |
| `font-fredoka-semibold` | Fredoka_600SemiBold | Titles, headings, buttons  |
| `font-nunito`           | Nunito_400Regular   | Body text, descriptions    |
| `font-nunito-semibold`  | Nunito_600SemiBold  | Emphasized body, subtitles |
| `font-nunito-bold`      | Nunito_700Bold      | Strong emphasis            |

### Typography — Font sizes

Child-friendly scale — larger than typical defaults.

| className   | Size | Line height | Use for                       |
| ----------- | ---- | ----------- | ----------------------------- |
| `text-xs`   | 12px | 16px        | Fine print, captions          |
| `text-sm`   | 14px | 20px        | Small labels                  |
| `text-base` | 16px | 24px        | Default body text             |
| `text-lg`   | 18px | 26px        | Large body text               |
| `text-xl`   | 22px | 30px        | Subtitles                     |
| `text-2xl`  | 26px | 34px        | Section headings, button text |
| `text-3xl`  | 32px | 40px        | Page headings                 |
| `text-4xl`  | 40px | 48px        | Emojis, large decorative      |
| `text-5xl`  | 52px | 60px        | Hero text                     |
| `text-6xl`  | 64px | 72px        | App title (Globo)             |

### Spacing

Extends Tailwind defaults with larger values for spacious layouts:

| Token | Value | Use for              |
| ----- | ----- | -------------------- |
| `18`  | 72px  | Large section gaps   |
| `22`  | 88px  | XL gaps              |
| `26`  | 104px | Hero spacing         |
| `30`  | 120px | Screen-level padding |

Standard Tailwind spacing (`1`–`16`, `20`, `24`, etc.) remains available.

### Border radius

Playful, generous rounding for a child-friendly feel.

| className        | Value  | Use for                          |
| ---------------- | ------ | -------------------------------- |
| `rounded-xl`     | 16px   | Cards, containers                |
| `rounded-2xl`    | 20px   | Larger cards                     |
| `rounded-3xl`    | 28px   | Buttons, prominent cards         |
| `rounded-4xl`    | 36px   | Large interactive elements       |
| `rounded-bubble` | 40px   | Badges, pills, floating elements |
| `rounded-full`   | 9999px | Circles, avatars                 |

## Patterns

### Animated components with NativeWind

Reanimated animated styles must go via the `style` prop. Static styling goes via `className`:

```tsx
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}))

// ✅ Correct — className for static, style for animated
<Animated.View className="rounded-3xl bg-brand-500 px-6 py-4" style={animatedStyle}>

// ❌ Wrong — all in style
<Animated.View style={[{ backgroundColor: '#1A73E8', padding: 16 }, animatedStyle]}>
```

### Shadows

Use Tailwind shadow utilities. For colored shadows, use the `/opacity` syntax:

```tsx
<View className="shadow-lg shadow-brand-500/35">
```

## Out of scope

- Animations — see animations.md
- Navigation layout styling — see navigation.md
