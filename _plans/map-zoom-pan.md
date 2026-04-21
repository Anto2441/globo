# Plan: Map Zoom and Pan

## Context

The world map screen (`features/map/WorldMap.tsx`) exists and renders a static SVG map with continent tap→label animations. This plan adds pinch-to-zoom, pan-to-navigate, a reset FAB, and disables continent taps while zoomed/panning — as specified in `_specs/map-zoom-pan.md`.

---

## Critical file

**One file changed only:** `features/map/WorldMap.tsx`

---

## Naming conflict

The existing `scale` shared value (line 34) is used for the **label animation**. Rename it to `labelScale` throughout to free up the name, and use `mapScale` for the new zoom shared value.

---

## New shared values

Add alongside existing `opacity` / `labelScale`:

| Name | Init | Purpose |
|---|---|---|
| `mapScale` | `1` | Current zoom level (1–4) |
| `mapTranslateX` | `0` | Current X translation |
| `mapTranslateY` | `0` | Current Y translation |
| `savedScale` | `1` | Zoom at pinch start |
| `savedTranslateX` | `0` | TranslateX at gesture start |
| `savedTranslateY` | `0` | TranslateY at gesture start |

---

## New React state

```
isZoomed: boolean      // true when mapScale > 1 (drives FAB visibility, disables taps)
isGestureActive: boolean  // true during any active pinch or pan (disables taps mid-gesture)
```

Both are updated from worklets via `runOnJS`.

`tapsEnabled = !isZoomed && !isGestureActive` — passed as condition to `<G onPress>`.

---

## Gesture composition

### `pinchGesture` — `Gesture.Pinch()`

- `.onStart(e)`:
  - Save `savedScale.value = mapScale.value`
  - Save `savedTranslateX.value = mapTranslateX.value`, `savedTranslateY.value = mapTranslateY.value`
  - `runOnJS(setIsGestureActive)(true)`

- `.onUpdate(e)`:
  - `newScale = clamp(savedScale.value * e.scale, 1, 4)`
  - Focal point adjustment (zoom toward pinch center, not map center):
    - `localFocalX = (e.focalX - screenWidth/2 - savedTranslateX.value) / savedScale.value`
    - `localFocalY = (e.focalY - svgHeight/2 - savedTranslateY.value) / savedScale.value`
    - `rawTx = e.focalX - screenWidth/2 - localFocalX * newScale`
    - `rawTy = e.focalY - svgHeight/2 - localFocalY * newScale`
    - Clamp both to pan bounds (see below)
  - Set `mapScale.value`, `mapTranslateX.value`, `mapTranslateY.value`

- `.onEnd()`:
  - `runOnJS(setIsZoomed)(mapScale.value > 1)`
  - `runOnJS(setIsGestureActive)(false)`

### `panGesture` — `Gesture.Pan()`

- `.onStart()`:
  - Save `savedTranslateX.value = mapTranslateX.value`, `savedTranslateY.value = mapTranslateY.value`
  - `runOnJS(setIsGestureActive)(true)`

- `.onUpdate(e)`:
  - `rawTx = savedTranslateX.value + e.translationX`
  - `rawTy = savedTranslateY.value + e.translationY`
  - Clamp both to pan bounds (see below), set shared values

- `.onEnd()`:
  - `runOnJS(setIsGestureActive)(false)`
  - (no setIsZoomed — scale didn't change)

### Pan bounds formula (runs on worklet)

```
maxX = (screenWidth * (mapScale.value - 1)) / 2
maxY = (svgHeight  * (mapScale.value - 1)) / 2
translateX = clamp(rawTx, -maxX, maxX)
translateY = clamp(rawTy, -maxY, maxY)
```

`svgHeight` must be stored in a shared value so it's accessible on the worklet thread.

### Compose

```ts
const composed = Gesture.Simultaneous(pinchGesture, panGesture)
```

---

## Animated map style

```ts
const mapAnimatedStyle = useAnimatedStyle(() => ({
  transform: [
    { translateX: mapTranslateX.value },
    { translateY: mapTranslateY.value },
    { scale: mapScale.value },
  ],
}))
```

---

## JSX structure change

Wrap SVG + label overlay together in an `Animated.View` so the label follows the map:

```
<View className="flex-1 w-full items-center justify-center">
  <View className="w-full relative">                     ← outer container (unchanged)
    <GestureDetector gesture={composed}>
      <Animated.View style={mapAnimatedStyle}>           ← NEW wrapping animated view
        <Svg ...>
          {CONTINENT_KEYS.map(continent =>
            <G
              key={continent}
              onPress={tapsEnabled ? () => handleTap(continent) : undefined}   ← CHANGED
            >
              ...paths...
            </G>
          )}
        </Svg>
      </Animated.View>
    </GestureDetector>

    {/* label overlay — outside animated view, stays fixed on screen */}
    {activeContinent && (
      <Animated.View style={[...absolutePosition, labelStyle]} pointerEvents="none">
        ...label...
      </Animated.View>
    )}

    {/* Reset FAB — outside animated view, fixed position */}
    {isZoomed && (
      <Pressable
        onPress={handleReset}
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center"
      >
        <Text>↺</Text>        ← or use an @expo/vector-icons icon
      </Pressable>
    )}
  </View>
</View>
```

---

## Reset handler

```ts
const handleReset = () => {
  mapTranslateX.value = withSpring(0)
  mapTranslateY.value = withSpring(0)
  mapScale.value = withSpring(1, {}, () => runOnJS(setIsZoomed)(false))
}
```

`setIsZoomed(false)` is called only after the spring completes via the third callback argument, so the FAB stays visible until the animation finishes.

---

## New imports needed

```ts
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { ..., withSpring } from 'react-native-reanimated'
import { Pressable } from 'react-native'
```

---

## Verification

1. Run `npx tsc --noEmit` — no type errors
2. Run `npx expo start`, open on device
3. Check:
   - Pinch zooms 1x→4x, clamps at boundaries
   - Pan is constrained, no empty-space leaks at any zoom level
   - Reset FAB appears on zoom, disappears after reset
   - Reset animates smoothly back to center 1x
   - Continent tap works at 1x, does nothing at zoom > 1x
   - No continent tap fires mid-gesture
