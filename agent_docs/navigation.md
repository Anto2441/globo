# Navigation — Expo Router

## Structure

```
app/_layout.tsx               ← Root Stack
├── index.tsx                 ← Welcome screen (no tab bar, animated landing)
└── (tabs)/_layout.tsx        ← Bottom Tab Navigator (2 tabs)
    ├── carte.tsx             ← Tab "Carte" (globe icon) — map screen
    └── quiz.tsx              ← Tab "Quiz" (? icon)
├── continent/[id].tsx        ← Stack screen, headerShown: false, back chevron
└── animal/[id].tsx           ← Stack screen, headerShown: false, back chevron
```

## Entry flow

1. App starts on `index.tsx` (welcome screen, no tab bar)
2. User presses "Jouer !" → `router.replace('/carte')` (shows tab bar, replaces history)
3. From tabs, navigate to `continent/[id]` or `animal/[id]` via `router.push()`

## Routing conventions

- Welcome screen at `app/index.tsx` — first screen user sees
- Tab screens in `app/(tabs)/`. Only `carte` and `quiz` are registered tabs
- Stack screens `continent/[id]` and `animal/[id]` are full-screen (no header, back chevron), pushed on top of tab bar
- Use `router.push('/continent/europe')` to navigate from tab screens to stack screens
- Use `router.back()` to return from a stack screen
- Use `router.replace()` to change screens without adding to history (e.g., welcome → tabs)
- Dynamic param accessed via `useLocalSearchParams<{ id: string }>()`

## Tab bar config

- Height: 72, Fredoka_400Regular labels, icon size 36 (tap-friendly for children)
- Active tint: `Colors[colorScheme].tint` (from `constants/theme.ts`)
- Haptic feedback via `HapticTab` component

## Icons

Icons use `IconSymbol` (SF Symbols on iOS, Material Icons on Android).
Relevant mappings in `components/ui/icon-symbol.tsx`:
- `'globe'` → `'public'` (Carte tab)
- `'questionmark.circle.fill'` → `'help'` (Quiz tab)
- `'chevron.right'` → `'chevron-right'` (mirrored with `scaleX: -1` for back arrow)
