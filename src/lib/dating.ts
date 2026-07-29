import type { Locale } from '../i18n'
import { formatDateParution } from './revueDetail'

export type PrecisionDate = 'certaine' | 'deduite'

export function formatAnneeOuDate(
  annee: number | undefined,
  dateParution: string | undefined,
  locale: Locale,
): string | undefined {
  return formatDateParution(dateParution, locale) ?? (annee ? String(annee) : undefined)
}

export interface PrecisionBadgeLabels {
  certaine: string
  deduite: string
}

export function getPrecisionBadge(
  hasDate: boolean,
  precisionDate: PrecisionDate | undefined,
  labels: PrecisionBadgeLabels,
): { label: string; variant: 'muted' } | undefined {
  if (!hasDate || !precisionDate) return undefined
  return precisionDate === 'certaine'
    ? { label: labels.certaine, variant: 'muted' }
    : { label: labels.deduite, variant: 'muted' }
}
