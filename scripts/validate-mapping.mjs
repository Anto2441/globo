import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Re-parse SVG directly (no tsx dependency)
const svgPath = resolve(__dirname, '../assets/svg/world.svg')
const svg = readFileSync(svgPath, 'utf-8')

const pathRegex = /<path\s([^>]+)>/g
const allIds = new Set()

let match
while ((match = pathRegex.exec(svg)) !== null) {
  const attrs = match[1]
  const idMatch = attrs.match(/\bid="([^"]+)"/)
  const classMatch = attrs.match(/\bclass="([^"]+)"/)
  const id = idMatch ? idMatch[1] : classMatch ? classMatch[1] : null
  if (id) allIds.add(id)
}

// Read countryContinents.ts as text and extract keys via regex
const mappingPath = resolve(__dirname, '../constants/countryContinents.ts')
const mappingText = readFileSync(mappingPath, 'utf-8')

// Match all keys in the record object (quoted or unquoted identifiers)
const keyRegex = /^\s+(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/gm
const mappedKeys = new Set()

let km
while ((km = keyRegex.exec(mappingText)) !== null) {
  const key = km[1] ?? km[2] ?? km[3]
  if (key) mappedKeys.add(key)
}

const missing = [...allIds].filter((id) => !mappedKeys.has(id)).sort()
const extra = [...mappedKeys].filter((k) => !allIds.has(k)).sort()

if (missing.length === 0) {
  console.log(`✓ All ${allIds.size} unique path IDs are mapped`)
} else {
  console.log(`✗ ${missing.length} unmapped IDs:`)
  missing.forEach((id) => console.log(`  - "${id}"`))
}

if (extra.length > 0) {
  console.log(`\nℹ️  ${extra.length} keys in mapping not found in SVG (may be intentional):`)
  extra.forEach((k) => console.log(`  - "${k}"`))
}

process.exit(missing.length > 0 ? 1 : 0)
