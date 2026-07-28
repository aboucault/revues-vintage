import type { CatalogEntry, CatalogEntryType } from './catalog'

export interface FilterCriteria {
  type?: CatalogEntryType
  categorie?: string
  marqueNom?: string
  decennieLabel?: string
  caracteristiqueStyle?: string
}

export function filterCatalog(entries: CatalogEntry[], criteria: FilterCriteria): CatalogEntry[] {
  return entries.filter((entry) => {
    if (criteria.type && entry.type !== criteria.type) return false
    if (criteria.categorie && !entry.categories.includes(criteria.categorie)) return false
    if (criteria.marqueNom && entry.marqueNom !== criteria.marqueNom) return false
    if (criteria.decennieLabel && entry.decennieLabel !== criteria.decennieLabel) return false
    if (criteria.caracteristiqueStyle && !entry.caracteristiquesStyle.includes(criteria.caracteristiqueStyle))
      return false
    return true
  })
}
