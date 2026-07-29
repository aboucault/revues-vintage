import type { CatalogEntry } from './catalog'

export type SortOption = 'recent' | 'titre-asc' | 'titre-desc'

export function sortEntries(entries: CatalogEntry[], sort: SortOption): CatalogEntry[] {
  const sorted = [...entries]
  if (sort === 'titre-asc') {
    sorted.sort((a, b) => a.titre.localeCompare(b.titre, 'fr'))
  } else if (sort === 'titre-desc') {
    sorted.sort((a, b) => b.titre.localeCompare(a.titre, 'fr'))
  } else {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  return sorted
}
