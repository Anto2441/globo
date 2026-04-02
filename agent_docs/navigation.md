# Navigation — Expo Router

## Structure

```
app/_layout.tsx               ← Root Stack
├── (tabs)/_layout.tsx        ← Bottom Tab Navigator (2 tabs)
│   ├── index.tsx             ← Tab "Carte" (globe icon) — home/landing screen
│   └── quiz.tsx              ← Tab "Quiz" (? icon)
├── continent/[id].tsx        ← Stack screen, headerShown: false
└── animal/[id].tsx           ← Stack screen, headerShown: false
```

## Routing conventions

- Tab screens live in `app/(tabs)/`. Only `index` and `quiz` are registered tabs.
- Stack screens `continent/[id]` and `animal/[id]` are full-screen (no header), pushed on top of the tab bar.
- Use `router.push('/continent/europe')` etc. to navigate from tab screens to stack screens.
- Use `router.back()` to return from a stack screen.
- Dynamic param accessed via `useLocalSearchParams<{ id: string }>()`.

## Tab bar config

- Height: 72, Fredoka_400Regular labels, icon size 36 (tap-friendly for children).
- Active tint: `Colors[colorScheme].tint` (from `constants/theme.ts`).
- Haptic feedback via `HapticTab` component.

## Icons

Icons use `IconSymbol` (SF Symbols on iOS, Material Icons on Android).
Relevant mappings in `components/ui/icon-symbol.tsx`:
- `'globe'` → `'public'` (Carte tab)
- `'questionmark.circle.fill'` → `'help'` (Quiz tab)
