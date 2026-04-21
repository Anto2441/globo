# Spec: Map Zoom and Pan

## Summary

Adds pinch-to-zoom and pan gestures to the world map. Lets the user explore the map in detail while keeping continent taps exclusive to the default 1x view.

## Stack constraints

- Gestures: `Gesture.Pinch()` + `Gesture.Pan()` composed with `Gesture.Simultaneous()` — no PanResponder
- Animations: Reanimated v3 shared values (`useSharedValue`, `useAnimatedStyle`) — no Animated API
- Reset button visibility driven by a derived shared value, animated with `withSpring`

## Functional requirements

- Pinch gesture zooms the map (min 1x, max 4x), centered on the pinch focal point
- Pan gesture translates the map freely while zoomed in
- Pan is constrained: map edges cannot be dragged past screen bounds at any zoom level
- A reset FAB appears bottom-right when zoom > 1x
- Tapping the reset FAB animates scale back to 1x and translation back to (0, 0)
- Reset FAB disappears once zoom returns to 1x
- Continent tap is only active when zoom = 1x and no gesture is in progress
- Continent tap is disabled during any active pinch or pan, and while zoom > 1x

## Out of scope

- Double-tap to zoom
- Zoom buttons (+ / -)
- Momentum/fling scrolling after pan release
- Per-continent zoom-in views

## Edge cases

- Pinch starts at zoom = 4x: scale is clamped, no overshoot
- Pan at zoom = 1x: constrained to (0, 0) — map stays centered
- Reset tapped mid-gesture: gesture completes, then reset animation runs
- Very fast pinch-out then immediate tap: tap is ignored if zoom > 1x at tap start

## Acceptance criteria

- Pinching zooms between 1x and 4x inclusive, no overshoot
- Panning at any zoom never shows empty space beyond map edges
- Reset FAB is invisible at zoom = 1x, visible at zoom > 1x
- Tapping reset returns map to scale 1x, centered, with a smooth spring animation
- Tapping a continent at zoom = 1x shows its French label
- Tapping a continent at zoom > 1x does nothing

## Open questions

- Should the pinch focal point be the anchor (zoom toward fingers), or always zoom from center? Pinch focal point: zoom toward the pinch focal point, not the center
- Should the reset animation use `withSpring` or `withTiming`? Reset animation: withSpring for both scale and translation

## Testing

- Manual: verify pinch, pan, clamping, reset, and continent tap on device
- Skip: unit tests on gesture math (too coupled to native gesture state)
