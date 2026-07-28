export interface FacetOption {
  value: string
  count: number
}

export function buildFacetOptions(values: string[]): FacetOption[] {
  const counts = new Map<string, number>()
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b, 'fr'))
    .map(([value, count]) => ({ value, count }))
}
