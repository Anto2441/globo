# Plan: World Map Bloc 1

## Context

The "Carte" tab is a stub. This feature replaces it with a full-screen interactive SVG world map
grouped by continent. The SVG (simplemaps, 2000×857 viewBox) has 470 flat `<path>` elements —
no existing grouping. We need to build a data pipeline (SVG → TS constants) and a WorldMap
component that groups paths by continent, makes each touchable, and shows an animated French
label on tap.

---

## Architecture

```
scripts/extract-svg-ids.mjs        → one-shot: print all IDs/classes to stdout (analysis only)
scripts/generate-world-paths.mjs   → one-shot: writes constants/worldPaths.ts
scripts/validate-mapping.mjs       → one-shot: checks every path ID has a continent entry

constants/worldPaths.ts            → generated: Array<{ id: string; d: string }>
constants/countryContinents.ts     → hand-authored: id/class → ContinentKey
constants/continentConfig.ts       → French names, colors, SVG anchor points

features/map/WorldMap.tsx          → main component
app/(tabs)/carte.tsx               → updated to render WorldMap
```

---

## Step 1 — SVG Analysis Script

**File:** `scripts/extract-svg-ids.mjs` (Node.js, no extra deps)

- Read `assets/svg/world.svg` with `fs.readFileSync`
- Regex-extract every `<path>` element capturing:
  - `id="..."` if present
  - `class="..."` if no `id`
  - `d="..."` attribute
- Print two groups to stdout:
  1. **ID paths** — sorted list of `id` values (e.g. `AF`, `FR`, `0`, `1`, `2`)
  2. **Class-only paths** — paths that have a `class` but no `id` (e.g. `Angola`, `Argentina`)
- Print suggested anchor points (geographic center of each continent in SVG coords):
  ```
  africa   → 1070, 520
  europe   → 1020, 240
  northam  →  330, 280
  southam  →  430, 580
  asia     → 1450, 320
  oceania  → 1680, 600
  antarctica → 1000, 810
  ```
- **Purpose:** allows manual verification of all IDs before authoring the mapping

Run: `node scripts/extract-svg-ids.mjs`

---

## Step 2 — Generate `constants/worldPaths.ts`

**File:** `scripts/generate-world-paths.mjs` (Node.js, no extra deps)

- Same regex parsing as Step 1
- Output format:
  ```ts
  // AUTO-GENERATED — do not edit manually. Run: node scripts/generate-world-paths.mjs
  export interface WorldPath { id: string; d: string }
  export const WORLD_PATHS: WorldPath[] = [ ... ]
  ```
- For paths with `id`: `id` = the id attribute value
- For class-only paths: `id` = the class attribute value (e.g. `"Angola"`)
- Total: ~470 entries covering all 172 unique keys

Run: `node scripts/generate-world-paths.mjs`  
Commit `constants/worldPaths.ts` — it's stable data, not regenerated at runtime.

---

## Step 3 — `constants/countryContinents.ts`

**File:** `constants/countryContinents.ts` (hand-authored)

```ts
export type ContinentKey = 'africa' | 'europe' | 'northam' | 'southam' | 'asia' | 'oceania' | 'antarctica'

export const COUNTRY_CONTINENTS: Record<string, ContinentKey> = {
  // ISO2 codes → continent
  'AF': 'asia', 'AL': 'europe', ...
  // Numeric IDs (disputed/special territories)
  '0': 'asia',  // Western Sahara disputed zone
  '1': 'africa', '2': 'africa',
  // BQ subdivisions (Caribbean Netherlands) → northam
  'BQBO': 'northam', 'BQSA': 'northam', 'BQSE': 'northam',
  // XK (Kosovo) → europe
  'XK': 'europe',
  // Class-only multi-part paths (e.g. islands, exclaves)
  'Angola': 'africa', 'Argentina': 'southam', 'Australia': 'oceania', ...
}
```

- All 172 unique IDs + class-only path names must be covered
- Numeric IDs (0, 1, 2) assigned after visual inspection during step 1

---

## Step 4 — Validate Mapping

**File:** `scripts/validate-mapping.mjs`

- Re-parse SVG directly (same regex as step 1, avoids tsx dependency)
- Import `COUNTRY_CONTINENTS` via dynamic import
- Print any IDs in WORLD_PATHS that are missing from COUNTRY_CONTINENTS
- Exit with code 1 if any missing → blocks implementation until mapping is complete

Run: `node scripts/validate-mapping.mjs`

---

## Step 5 — `constants/continentConfig.ts`

**File:** `constants/continentConfig.ts`

```ts
export const CONTINENT_CONFIG: Record<ContinentKey, {
  label: string        // French name
  color: string        // hex matching tailwind token DEFAULT
  anchor: { x: number; y: number }  // SVG coords in 2000×857 space
}> = {
  africa:     { label: 'Afrique',           color: '#FFB74D', anchor: { x: 1070, y: 520 } },
  europe:     { label: 'Europe',            color: '#42A5F5', anchor: { x: 1020, y: 240 } },
  northam:    { label: 'Amérique du Nord',  color: '#FF7043', anchor: { x: 330,  y: 280 } },
  southam:    { label: 'Amérique du Sud',   color: '#66BB6A', anchor: { x: 430,  y: 580 } },
  asia:       { label: 'Asie',              color: '#FFEE58', anchor: { x: 1450, y: 320 } },
  oceania:    { label: 'Océanie',           color: '#AB47BC', anchor: { x: 1680, y: 600 } },
  antarctica: { label: 'Antarctique',       color: '#E0E0E0', anchor: { x: 1000, y: 810 } },
}
```

Anchor coordinates are approximate; tuned visually after first render.

---

## Step 6 — `features/map/WorldMap.tsx`

### Data grouping (at module level, outside component)

```ts
const continentPaths = groupBy(WORLD_PATHS, (p) =>
  COUNTRY_CONTINENTS[p.id] ?? 'antarctica'   // fallback for unmapped IDs
)
```

### SVG rendering

- `<View className="flex-1">` wrapping a `<Svg width="100%" height="100%" viewBox="0 0 2000 857">`
- 7 `<G key={continent} onPress={() => handleTap(continent)}>` elements, one per continent
- Each `<G>` renders its paths as `<Path d={p.d} fill={config.color} stroke="#ffffff" strokeWidth={0.5} />`

### `<G onPress>` — Primary approach

react-native-svg v15 supports `onPress` natively on `<G>`. Use it directly.

### Fallback if `<G onPress>` is unreliable

Replace each `<G>` with a transparent `<Rect>` overlay approach:
- Keep `<G>` for rendering only (no `onPress`)
- Add `<Rect fill="transparent" x y width height onPress>` after each `<G>`, with bounding box approximated from `CONTINENT_CONFIG.anchor`
- This is the SVG-native equivalent of `TouchableOpacity`

### Label animation (Reanimated v3 API)

```ts
const opacity  = useSharedValue(0)
const scale    = useSharedValue(0.8)
const activeContinent = useRef<ContinentKey | null>(null)
const timer    = useRef<ReturnType<typeof setTimeout> | null>(null)

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{ scale: scale.value }],
}))

function handleTap(continent: ContinentKey) {
  if (timer.current) clearTimeout(timer.current)
  activeContinent.current = continent
  opacity.value = withTiming(1, { duration: 200 })
  scale.value   = withTiming(1, { duration: 200 })
  timer.current = setTimeout(() => {
    opacity.value = withTiming(0, { duration: 300 })
  }, 3000)
}
```

- `<Animated.View>` positioned absolutely over the SVG
- Anchor converted: `left = (anchor.x / 2000) * 100 + '%'`, `top = (anchor.y / 857) * 100 + '%'`
- Label text: `CONTINENT_CONFIG[activeContinent.current].label`
- Styled with `font-fredoka-semibold text-2xl` (NativeWind)

---

## Step 7 — Update `app/(tabs)/carte.tsx`

```tsx
import { View } from 'react-native'
import WorldMap from '@/features/map/WorldMap'

export default function CarteScreen() {
  return (
    <View className="flex-1">
      <WorldMap />
    </View>
  )
}
```

Removes: ScrollView, SvgTest import, Text heading.

---

## Critical Files

| File | Action |
|------|--------|
| `assets/svg/world.svg` | Read-only source |
| `scripts/extract-svg-ids.mjs` | Create |
| `scripts/generate-world-paths.mjs` | Create |
| `scripts/validate-mapping.mjs` | Create |
| `constants/worldPaths.ts` | Generated (committed) |
| `constants/countryContinents.ts` | Create |
| `constants/continentConfig.ts` | Create |
| `features/map/WorldMap.tsx` | Create |
| `app/(tabs)/carte.tsx` | Update |

---

## Verification

1. `node scripts/extract-svg-ids.mjs` → inspect all IDs and class names; use to author mapping
2. `node scripts/generate-world-paths.mjs` → `constants/worldPaths.ts` appears with ~470 entries
3. `node scripts/validate-mapping.mjs` → prints "All X paths mapped ✓" (zero warnings)
4. `npx tsc --noEmit` → no errors
5. `npx expo start` → map renders with 7 colored continents; tapping shows French label with scale+fade; label disappears after 3 s
