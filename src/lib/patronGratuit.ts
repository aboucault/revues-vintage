import type { StatutDroits } from './sanity'

export function canShowGalerie(patron: {
  couverturesUrls?: string[]
  revueSourceStatutDroits?: StatutDroits
  revueSourceSlug?: string
}): boolean {
  return Boolean(
    patron.couverturesUrls &&
      patron.couverturesUrls.length > 0 &&
      patron.revueSourceStatutDroits === 'domaine-public' &&
      patron.revueSourceSlug,
  )
}
