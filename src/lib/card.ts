import { getEntryPath } from './catalog'
import type { CatalogEntry } from './catalog'
import { formatAnneeOuDate } from './dating'
import { useTranslations } from '../i18n'
import type { Locale } from '../i18n'

const DOWNLOAD_ICON =
  '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 4v9"/><path d="M6.5 9.5 10 13l3.5-3.5"/><path d="M4 15.5v.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-.5"/></svg>'

export function getCardSubtitleLines(entry: CatalogEntry, locale: Locale): string[] {
  const t = useTranslations(locale)
  const lines: string[] = []
  if (entry.numero) lines.push(t.card.numero(entry.numero))
  const dateLine = formatAnneeOuDate(entry.annee, entry.dateParution, locale) ?? entry.decennieLabel
  if (dateLine) lines.push(dateLine)
  return lines
}

export function renderEntryCardHtml(entry: CatalogEntry, locale: Locale): string {
  const t = useTranslations(locale)
  const basePath = getEntryPath(entry)
  const path = basePath && locale === 'en' ? `/en${basePath}` : basePath

  const image = entry.imageUrl ? `<img src="${entry.imageUrl}" alt="${entry.titre}" loading="lazy" />` : ''
  const media = image ? (path ? `<a href="${path}" class="card-media">${image}</a>` : `<span class="card-media">${image}</span>`) : ''

  const subtitleLines = getCardSubtitleLines(entry, locale)
  const subtitle = subtitleLines.length > 0 ? `<span class="card-subtitle">${subtitleLines.join(' · ')}</span>` : ''
  const info = `<span class="card-title">${entry.titre}</span>${subtitle}`
  const infoLink = path ? `<a href="${path}" class="card-link">${info}</a>` : `<span class="card-link">${info}</span>`

  const download = entry.telechargementUrl
    ? `<a class="card-download" href="${entry.telechargementUrl}" download aria-label="${t.card.telecharger}">${DOWNLOAD_ICON}</a>`
    : ''

  return `<li class="card">${media}<div class="card-row">${infoLink}${download}</div></li>`
}
