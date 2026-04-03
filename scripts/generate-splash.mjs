/**
 * Generates assets/images/splash-icon.png
 * Globe + "Globo" text on a transparent background.
 * Background color (#1A73E8) is applied by the expo-splash-screen plugin in app.json.
 *
 * Usage: node scripts/generate-splash.mjs
 * Requires: sharp (npm install -D sharp)
 */

import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Colors (from tailwind.config.js) ──────────────────────────────
const BRAND_50  = '#E8F4FD'
const BRAND_100 = '#C5E3F9'
const BRAND_200 = '#8EC8F3'
const BRAND_300 = '#57ADEC'
const WHITE     = '#FFFFFF'

// ── Build a 4-pointed star path ────────────────────────────────────
function starPath(cx, cy, outerR, innerR, points = 4) {
  const step = (2 * Math.PI) / (points * 2)
  const verts = Array.from({ length: points * 2 }, (_, i) => {
    const angle = i * step - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    return `${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`
  })
  return `M ${verts.join(' L ')} Z`
}

async function main() {
  // Embed Fredoka SemiBold so the font renders correctly via librsvg
  const fontPath = resolve(
    ROOT,
    'node_modules/@expo-google-fonts/fredoka/600SemiBold/Fredoka_600SemiBold.ttf',
  )
  const fontBase64 = readFileSync(fontPath).toString('base64')

  // ── Globe geometry ─────────────────────────────────────────────
  const cx = 512
  const cy = 320
  const r  = 260

  // Latitude lines: y positions for ±60°, ±30°, 0° (equator)
  const latYs = [-55, -28, 0, 28, 55].map(
    deg => (cy - r * Math.sin((deg * Math.PI) / 180)).toFixed(1),
  )

  // Longitude ellipses: x-radii for vertical ovals
  const lonRx = [r * 0.44, r * 0.82].map(v => v.toFixed(1))

  // Decorative 4-pointed stars scattered around the globe
  const stars = [
    { x: 155, y: 135, or: 22, ir: 9 },
    { x: 855, y: 195, or: 17, ir: 7 },
    { x: 105, y: 510, or: 13, ir: 5 },
    { x: 910, y: 475, or: 19, ir: 8 },
    { x: 790, y: 108, or: 11, ir: 4 },
  ]

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">
  <defs>
    <style>
      @font-face {
        font-family: 'Fredoka';
        src: url('data:font/truetype;base64,${fontBase64}');
        font-weight: 600;
      }
    </style>

    <!-- Globe gradient: light blue radial, lighter at top-left -->
    <radialGradient id="globe-grad" cx="38%" cy="32%" r="68%">
      <stop offset="0%"   stop-color="${BRAND_50}"/>
      <stop offset="100%" stop-color="${BRAND_100}"/>
    </radialGradient>

    <!-- Clip everything inside the globe circle -->
    <clipPath id="globe-clip">
      <circle cx="${cx}" cy="${cy}" r="${r}"/>
    </clipPath>

    <!-- Soft drop shadow -->
    <filter id="shadow" x="-25%" y="-15%" width="150%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="26" flood-color="rgba(10,55,135,0.35)"/>
    </filter>
  </defs>

  <!-- Shadow layer (separate circle so the fill isn't affected) -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${BRAND_100}" filter="url(#shadow)" opacity="0.6"/>

  <!-- Globe body -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#globe-grad)"/>

  <!-- Grid lines — clipped to globe -->
  <g clip-path="url(#globe-clip)" stroke="${BRAND_200}" stroke-width="2.5" fill="none" opacity="0.85">
    <!-- Latitude horizontals -->
    ${latYs.map(y => `<line x1="${cx - r - 5}" y1="${y}" x2="${cx + r + 5}" y2="${y}"/>`).join('\n    ')}
    <!-- Central meridian -->
    <line x1="${cx}" y1="${cy - r - 5}" x2="${cx}" y2="${cy + r + 5}"/>
    <!-- Longitude ovals -->
    ${lonRx.map(rx => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${r}"/>`).join('\n    ')}
  </g>

  <!-- Equator slightly bolder -->
  <line
    x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"
    stroke="${BRAND_300}" stroke-width="3.5"
    clip-path="url(#globe-clip)"
  />

  <!-- Globe outline ring -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND_300}" stroke-width="5"/>

  <!-- Decorative 4-pointed stars -->
  ${stars.map(s => `<path d="${starPath(s.x, s.y, s.or, s.ir)}" fill="${WHITE}" opacity="0.9"/>`).join('\n  ')}

  <!-- "Globo" wordmark -->
  <text
    x="${cx}"
    y="782"
    font-family="Fredoka, 'Trebuchet MS', sans-serif"
    font-weight="600"
    font-size="148"
    fill="${WHITE}"
    text-anchor="middle"
    letter-spacing="3"
  >Globo</text>
</svg>`

  const outPath = resolve(ROOT, 'assets/images/splash-icon.png')
  await sharp(Buffer.from(svg)).png().toFile(outPath)
  console.log('✅  assets/images/splash-icon.png generated')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
