import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(__dirname, '../assets/svg/world.svg')
const svg = readFileSync(svgPath, 'utf-8')

// Extract all <path ...> elements
const pathRegex = /<path\s([^>]+)>/g
const idPaths = []
const classPaths = []

let match
while ((match = pathRegex.exec(svg)) !== null) {
  const attrs = match[1]
  const idMatch = attrs.match(/\bid="([^"]+)"/)
  const classMatch = attrs.match(/\bclass="([^"]+)"/)

  if (idMatch) {
    idPaths.push(idMatch[1])
  } else if (classMatch) {
    classPaths.push(classMatch[1])
  }
}

const uniqueIds = [...new Set(idPaths)].sort()
const uniqueClasses = [...new Set(classPaths)].sort()

console.log('=== ID paths ===')
console.log(`Count: ${uniqueIds.length}`)
console.log(uniqueIds.join(', '))

console.log('\n=== Class-only paths (no id) ===')
console.log(`Count: ${uniqueClasses.length}`)
console.log(uniqueClasses.join(', '))

console.log('\n=== Suggested anchor points (SVG coords, viewBox 2000×857) ===')
console.log('africa     → x: 1070, y: 520')
console.log('europe     → x: 1020, y: 240')
console.log('northam    → x:  330, y: 280')
console.log('southam    → x:  430, y: 580')
console.log('asia       → x: 1450, y: 320')
console.log('oceania    → x: 1680, y: 600')
console.log('antarctica → x: 1000, y: 810')
