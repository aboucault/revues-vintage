import type { CatalogEntry, CatalogEntryType } from './catalog'

export interface FilterCriteria {
  type?: CatalogEntryType
  q?: string
  categories?: string[]
  typesActivite?: string[]
  marques?: string[]
  decennies?: string[]
  caracteristiques?: string[]
  titres?: string[]
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function buildSearchBlob(entry: CatalogEntry): string {
  return [
    entry.titre,
    ...entry.caracteristiquesStyle,
    ...entry.categories,
    ...entry.typeActivite,
    entry.marqueNom ?? '',
    entry.decennieLabel ?? '',
  ].join(' ')
}

export function filterCatalog(entries: CatalogEntry[], criteria: FilterCriteria): CatalogEntry[] {
  return entries.filter((entry) => {
    if (criteria.type && entry.type !== criteria.type) return false
    if (criteria.q) {
      const words = normalizeSearchText(criteria.q).split(/\s+/).filter(Boolean)
      const haystack = normalizeSearchText(buildSearchBlob(entry))
      if (!words.every((word) => haystack.includes(word))) return false
    }

    const categories = criteria.categories
    if (categories && categories.length > 0 && !entry.categories.some((c) => categories.includes(c)))
      return false

    const typesActivite = criteria.typesActivite
    if (
      typesActivite &&
      typesActivite.length > 0 &&
      !entry.typeActivite.some((t) => typesActivite.includes(t))
    )
      return false

    const marques = criteria.marques
    if (marques && marques.length > 0 && !(entry.marqueNom && marques.includes(entry.marqueNom))) return false

    const decennies = criteria.decennies
    if (decennies && decennies.length > 0 && !(entry.decennieLabel && decennies.includes(entry.decennieLabel)))
      return false

    const caracteristiques = criteria.caracteristiques
    if (
      caracteristiques &&
      caracteristiques.length > 0 &&
      !entry.caracteristiquesStyle.some((c) => caracteristiques.includes(c))
    )
      return false

    const titres = criteria.titres
    if (titres && titres.length > 0 && !titres.includes(entry.titre)) return false

    return true
  })
}
