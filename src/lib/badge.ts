import type { CatalogEntryType } from './catalog'
import { useTranslations } from '../i18n'
import type { Locale } from '../i18n'

export type BadgeVariant = 'primary' | 'accent'

export function getBadgeLabel(type: CatalogEntryType, locale: Locale): string {
  const t = useTranslations(locale)
  if (type === 'revue') return t.badges.revue
  if (type === 'pochette-patron') return t.badges.pochettePatron
  return t.badges.patronGratuit
}

export function getBadgeVariant(type: CatalogEntryType): BadgeVariant {
  return type === 'pochette-patron' ? 'accent' : 'primary'
}
