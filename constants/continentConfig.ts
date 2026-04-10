import type { ContinentKey } from './countryContinents'

export interface ContinentConfig {
  label: string
  color: string
  // Anchor point in SVG coordinate space (viewBox 0 0 2000 857)
  anchor: { x: number; y: number }
}

export const CONTINENT_CONFIG: Record<ContinentKey, ContinentConfig> = {
  africa: { label: 'Afrique', color: '#FFB74D', anchor: { x: 1070, y: 520 } },
  europe: { label: 'Europe', color: '#42A5F5', anchor: { x: 1020, y: 240 } },
  northam: { label: 'Amérique du Nord', color: '#FF7043', anchor: { x: 330, y: 280 } },
  southam: { label: 'Amérique du Sud', color: '#66BB6A', anchor: { x: 430, y: 580 } },
  asia: { label: 'Asie', color: '#FFEE58', anchor: { x: 1450, y: 320 } },
  oceania: { label: 'Océanie', color: '#AB47BC', anchor: { x: 680, y: 600 } },
  antarctica: { label: 'Antarctique', color: '#E0E0E0', anchor: { x: 1400, y: 810 } },
}
