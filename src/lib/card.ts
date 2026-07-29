import { getEntryPath } from './catalog'
import type { CatalogEntry } from './catalog'
import { getBadgeLabel, getBadgeVariant } from './badge'
import { formatAnneeOuDate } from './dating'
import { useTranslations } from '../i18n'
import type { Locale } from '../i18n'

export function getCardSubtitleLines(entry: CatalogEntry, locale: Locale): string[] {
  const t = useTranslations(locale)
  const lines: string[] = []
  const dateLine = formatAnneeOuDate(entry.annee, entry.dateParution, locale) ?? entry.decennieLabel
  if (dateLine) lines.push(dateLine)
  if (entry.numero) lines.push(t.card.numero(entry.numero))
  return lines
}

export function renderEntryCardHtml(entry: CatalogEntry, locale: Locale): string {
  const t = useTranslations(locale)
  const badge = `<span class="badge badge--${getBadgeVariant(entry.type)}">${getBadgeLabel(entry.type, locale)}</span>`
  const image = entry.imageUrl ? `<img src="${entry.imageUrl}" alt="${entry.titre}" loading="lazy" />` : ''
  const content = `${badge}${image}<span class="card-title">${entry.titre}</span>`
  const basePath = getEntryPath(entry)
  const path = basePath && locale === 'en' ? `/en${basePath}` : basePath
  const media = path ? `<a href="${path}">${content}</a>` : content
  const download = entry.telechargementUrl
    ? `<a class="card-download" href="${entry.telechargementUrl}" download>${t.card.telecharger}</a>`
    : ''
  return `<li class="card">${media}${download}</li>`
}
