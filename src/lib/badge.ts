import type { CatalogEntryType } from './catalog'

export type BadgeVariant = 'primary' | 'accent'

export function getBadgeLabel(type: CatalogEntryType): string {
  if (type === 'revue') return 'Revue'
  if (type === 'pochette-patron') return 'Pochette à dater'
  return 'Patron gratuit'
}

export function getBadgeVariant(type: CatalogEntryType): BadgeVariant {
  return type === 'pochette-patron' ? 'accent' : 'primary'
}
