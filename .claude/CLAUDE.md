# CLAUDE.md

## Project

Globo — a mobile app to introduce my child to geography.
Built with Expo / React Native.
Personal project — simplicity and fun beat over-engineering.

## Stack

- Expo SDK 54, Expo Router, New Architecture enabled
- React Native / TypeScript strict
- Styling: NativeWind — never use StyleSheet or inline styles
- Animations: Reanimated v3 — never use Animated API
- Gestures: Gesture Handler v2 (Gesture.X() API) — never use PanResponder
- SVG: react-native-svg + react-native-svg-transformer

## Project structure

```
app/          → Expo Router screens
components/   → shared UI components
features/     → feature folders (co-locate component + logic)
constants/    → static data (continent colors, items…)
assets/       → SVG illustrations, sounds
agent_docs/   → detailed context files (read when relevant)
_specs/       → feature specs
_plans/       → implementation plans
```

## How to work

- Read the relevant spec in \_specs/ before implementing anything
- Read agent_docs/ files relevant to the current task before starting
- Follow existing code patterns before introducing new ones
- After each change run: `npx tsc --noEmit` then `npx expo start`
- Never install a new dependency without asking first

## Agent docs

Read only when relevant to the current task:

- agent_docs/styling.md — NativeWind conventions and patterns
- agent_docs/svg-map.md — react-native-svg patterns for the map
- agent_docs/navigation.md — Expo Router structure and conventions
- agent_docs/animations.md — Reanimated + Gesture Handler patterns
