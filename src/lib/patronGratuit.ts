import type { StatutDroits } from './sanity'

export function buildRevueReaderUrl(scanUrl: string, page: number): string {
  return `${scanUrl}#page=${page}`
}

export function canShowRevueReader(patron: {
  pages?: number[]
  revueScanUrl?: string
  revueSourceStatutDroits?: StatutDroits
}): boolean {
  return Boolean(
    patron.revueScanUrl &&
      patron.revueSourceStatutDroits === 'domaine-public' &&
      patron.pages &&
      patron.pages.length > 0,
  )
}
