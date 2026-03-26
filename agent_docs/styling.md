# Styling

## Rules

- Always use NativeWind className — never use StyleSheet or inline style props
- Never use arbitrary Tailwind values unless no semantic token exists
- Font families must match exactly the loaded weights (see below) — no other values are valid

## Typography

Loaded fonts and their className equivalents:

| Font | Weight | className |
|------|--------|-----------|
| Nunito | 400 | `font-[Nunito_400Regular]` |
| Nunito | 600 | `font-[Nunito_600SemiBold]` |
| Nunito | 700 | `font-[Nunito_700Bold]` |
| Fredoka | 400 | `font-[Fredoka_400Regular]` |
| Fredoka | 600 | `font-[Fredoka_600SemiBold]` |

```tsx
// ✅ Correct
<Text className="font-[Nunito_400Regular] text-base text-gray-800">Hello</Text>

// ❌ Wrong — weight not loaded
<Text className="font-[Nunito_500Medium]">Hello</Text>
```

## Out of scope

- Animations — see animations.md
- Navigation layout styling — see navigation.md
