/**
 * Generates assets/images/icon.png (1024x1024)
 * Globe design with Fredoka "Globo" text.
 *
 * Usage: node scripts/generate-icon.mjs
 * Requires: sharp
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
const BRAND_500 = '#1A73E8'
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
  // Embed Fredoka SemiBold
  const fontPath = resolve(
    ROOT,
    'node_modules/@expo-google-fonts/fredoka/600SemiBold/Fredoka_600SemiBold.ttf',
  )
  const fontBase64 = readFileSync(fontPath).toString('base64')

  // ── Globe geometry ─────────────────────────────────────────────
  const cx = 512
  const cy = 420
  const r  = 340

  // Latitude lines
  const latYs = [-72, -36, 0, 36, 72].map(
    deg => (cy - r * Math.sin((deg * Math.PI) / 180)).toFixed(1),
  )

  // Longitude ellipses
  const lonRx = [r * 0.44, r * 0.82].map(v => v.toFixed(1))

  // Decorative stars
  const stars = [
    { x: 180, y: 160, or: 28, ir: 11 },
    { x: 880, y: 220, or: 22, ir: 9 },
    { x: 120, y: 650, or: 17, ir: 7 },
    { x: 900, y: 620, or: 25, ir: 10 },
    { x: 810, y: 120, or: 15, ir: 6 },
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

    <!-- Radial gradient for globe -->
    <radialGradient id="icon-globe-grad" cx="38%" cy="32%" r="68%">
      <stop offset="0%"   stop-color="${BRAND_50}"/>
      <stop offset="100%" stop-color="${BRAND_100}"/>
    </radialGradient>

    <!-- Clip for globe -->
    <clipPath id="icon-globe-clip">
      <circle cx="${cx}" cy="${cy}" r="${r}"/>
    </clipPath>

    <!-- Soft shadow -->
    <filter id="icon-shadow" x="-25%" y="-15%" width="150%" height="150%">
      <feDropShadow dx="0" dy="18" stdDeviation="34" flood-color="rgba(10,55,135,0.4)"/>
    </filter>
  </defs>

  <!-- Shadow -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${BRAND_100}" filter="url(#icon-shadow)" opacity="0.7"/>

  <!-- Globe body -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#icon-globe-grad)"/>

  <!-- Grid lines -->
  <g clip-path="url(#icon-globe-clip)" stroke="${BRAND_200}" stroke-width="3.5" fill="none" opacity="0.85">
    ${latYs.map(y => `<line x1="${cx - r - 10}" y1="${y}" x2="${cx + r + 10}" y2="${y}"/>`).join('\n    ')}
    <line x1="${cx}" y1="${cy - r - 10}" x2="${cx}" y2="${cy + r + 10}"/>
    ${lonRx.map(rx => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${r}"/>`).join('\n    ')}
  </g>

  <!-- Equator bold -->
  <line
    x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}"
    stroke="${BRAND_300}" stroke-width="4.5"
    clip-path="url(#icon-globe-clip)"
  />

  <!-- Globe outline -->
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${BRAND_300}" stroke-width="6"/>

  <!-- Stars -->
  ${stars.map(s => `<path d="${starPath(s.x, s.y, s.or, s.ir)}" fill="${WHITE}" opacity="0.95"/>`).join('\n  ')}

  <!-- "Globo" text below globe -->
  <text
    x="${cx}"
    y="920"
    font-family="Fredoka, 'Trebuchet MS', sans-serif"
    font-weight="600"
    font-size="118"
    fill="${BRAND_500}"
    text-anchor="middle"
    letter-spacing="2"
  >Globo</text>
</svg>`

  const outPath = resolve(ROOT, 'assets/images/icon.png')
  await sharp(Buffer.from(svg)).png().toFile(outPath)
  console.log('✅  assets/images/icon.png generated (1024x1024)')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
