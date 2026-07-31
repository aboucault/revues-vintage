import type { StatutDroits } from './sanity'
import type { Locale } from '../i18n'

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

export function canShowTranslation(patron: { traductionInstructionsEn?: string }, locale: Locale): boolean {
  return locale === 'en' && Boolean(patron.traductionInstructionsEn)
}
