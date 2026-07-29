import type { StatutDroits } from './sanity'
import type { Locale } from '../i18n'
import { useTranslations } from '../i18n'

export function getLegalText(statutDroits: StatutDroits, locale: Locale): string {
  const t = useTranslations(locale)
  if (statutDroits === 'domaine-public') return t.detailPage.legalDomainePublic
  if (statutDroits === 'incertain') return t.detailPage.legalIncertain
  return t.detailPage.legalProtege
}
