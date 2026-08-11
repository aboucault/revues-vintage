export interface FilterUsedEvent {
  event: 'filter_used'
  filter_type: string
  filter_value: string
}

export interface SearchUsedEvent {
  event: 'search_used'
  query: string
}

export type ShareContentType = 'revue' | 'pochette' | 'patron'

export type ShareMethod = 'pinterest' | 'facebook' | 'x' | 'whatsapp' | 'email' | 'copy_link' | 'native'

export interface ShareEvent {
  event: 'share'
  content_type: ShareContentType
  slug: string
  method: ShareMethod
}

export function buildFilterEvent(filterType: string, filterValue: string): FilterUsedEvent {
  return { event: 'filter_used', filter_type: filterType, filter_value: filterValue }
}

export function buildSearchEvent(query: string): SearchUsedEvent {
  return { event: 'search_used', query }
}

export function buildShareEvent(contentType: ShareContentType, slug: string, method: ShareMethod): ShareEvent {
  return { event: 'share', content_type: contentType, slug, method }
}
