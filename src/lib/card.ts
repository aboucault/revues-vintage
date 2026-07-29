import { getEntryPath } from './catalog'
import type { CatalogEntry } from './catalog'
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
  const image = entry.imageUrl ? `<img src="${entry.imageUrl}" alt="${entry.titre}" loading="lazy" />` : ''
  const subtitle = getCardSubtitleLines(entry, locale)
    .map((line) => `<span class="card-subtitle">${line}</span>`)
    .join('')
  const content = `${image}<span class="card-title">${entry.titre}</span>${subtitle}`
  const basePath = getEntryPath(entry)
  const path = basePath && locale === 'en' ? `/en${basePath}` : basePath
  const link = path ? `<a href="${path}">${content}</a>` : content
  const download = entry.telechargementUrl
    ? `<a class="card-download" href="${entry.telechargementUrl}" download>${t.card.telecharger}</a>`
    : ''
  return `<li class="card">${link}${download}</li>`
}
