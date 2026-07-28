import { getEntryPath } from './catalog'
import type { CatalogEntry } from './catalog'
import { getBadgeLabel, getBadgeVariant } from './badge'

export function renderEntryCardHtml(entry: CatalogEntry): string {
  const badge = `<span class="badge badge--${getBadgeVariant(entry.type)}">${getBadgeLabel(entry.type)}</span>`
  const image = entry.imageUrl ? `<img src="${entry.imageUrl}" alt="${entry.titre}" loading="lazy" />` : ''
  const content = `${badge}${image}<span class="card-title">${entry.titre}</span>`
  const path = getEntryPath(entry)
  const media = path ? `<a href="${path}">${content}</a>` : content
  const download = entry.telechargementUrl
    ? `<a class="card-download" href="${entry.telechargementUrl}" download>Télécharger</a>`
    : ''
  return `<li class="card">${media}${download}</li>`
}
