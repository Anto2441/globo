import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(__dirname, '../assets/svg/world.svg')
const outPath = resolve(__dirname, '../constants/worldPaths.ts')

const svg = readFileSync(svgPath, 'utf-8')

// Extract all <path ...> elements
const pathRegex = /<path\s([^>]+)>/g
const paths = []

let match
while ((match = pathRegex.exec(svg)) !== null) {
  const attrs = match[1]
  const idMatch = attrs.match(/\bid="([^"]+)"/)
  const classMatch = attrs.match(/\bclass="([^"]+)"/)
  const dMatch = attrs.match(/\bd="([^"]+)"/)

  if (!dMatch) continue

  const id = idMatch ? idMatch[1] : classMatch ? classMatch[1] : null
  if (!id) continue

  paths.push({ id, d: dMatch[1] })
}

const lines = paths.map(({ id, d }) => `  { id: ${JSON.stringify(id)}, d: ${JSON.stringify(d)} },`)

const output = `// AUTO-GENERATED — do not edit manually. Run: node scripts/generate-world-paths.mjs
export interface WorldPath {
  id: string
  d: string
}

export const WORLD_PATHS: WorldPath[] = [
${lines.join('\n')}
]
`

writeFileSync(outPath, output, 'utf-8')
console.log(`✓ Written ${paths.length} paths to constants/worldPaths.ts`)
