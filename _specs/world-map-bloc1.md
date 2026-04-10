# Spec: World Map Bloc 1

## Summary

Displays a full-screen interactive world map (simplemaps world.svg) grouped by continent.
Tapping a continent shows an animated French label; designed as the main "Carte" tab screen.

## Stack constraints

- SVG rendered with react-native-svg; paths sourced from assets/svg/world.svg
- Country-to-continent mapping is a static TS file at constants/countryContinents.ts (ISO2 → ContinentKey)
- Continent colors come from tailwind.config.js theme tokens, not hardcoded inline
- Tap handled via react-native-svg `onPress` on `<G>` groups, not Gesture Handler
- Animations (scale + fade in/out) use Reanimated v3 shared values + useAnimatedStyle

## Functional requirements

- Map fills the carte.tsx screen with no scrolling or padding
- SVG paths are grouped by continent into 7 `<G>` elements, each with an `onPress`
- Each continent group is filled with its theme color (africa #FFB74D, europe #42A5F5, northam #FF7043, southam #66BB6A, asia #FFEE58, oceania #AB47BC, antarctica #E0E0E0)
- Tapping a continent triggers a scale + fade-in animated label showing the French name
- Only one label is visible at a time; tapping a new continent replaces the current label instantly
- Label auto-dismisses after 3 s with a fade-out animation
- Label uses Fredoka font and is positioned near the tapped continent (fixed per-continent anchor point)

## Out of scope

- Zoom and pan
- Navigation to continent/[id] detail screen
- Country-level interaction or highlighting
- Dynamic data fetching

## Edge cases

- Tapping the same continent while its label is visible resets the 3 s timer
- Antarctica label must remain readable despite the small landmass size

## Acceptance criteria

- All 7 continent groups render with correct fill colors matching tailwind.config.js tokens
- Tapping each continent shows the correct French name label with scale + fade-in
- A second tap on a different continent removes the first label immediately
- Label disappears automatically after 3 s via fade-out
- `npx tsc --noEmit` passes with no errors

## Open questions

- Should the label include a small flag or icon, or text only? (assume text only for now)

## Testing

- Manual: tap each continent and verify label text, color, and animation
- TypeScript: ensure countryContinents.ts covers all ISO2 codes present in world.svg
- Skip unit tests for animation timing
