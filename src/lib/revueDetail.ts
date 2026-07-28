import type { Locale } from '../i18n'

export function formatDateParution(dateParution: string | undefined, locale: Locale): string | undefined {
  if (!dateParution) return undefined
  const date = new Date(`${dateParution}T00:00:00`)
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

export function getRevueDisplayTitre(titre: string, dateParution: string | undefined, locale: Locale): string {
  const dateFormatee = formatDateParution(dateParution, locale)
  return dateFormatee ? `${titre} — ${dateFormatee}` : titre
}
