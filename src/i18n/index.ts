import { fr } from './fr'
import { en } from './en'
import type { Dictionary } from './types'

export type Locale = 'fr' | 'en'
export type { Dictionary }

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export function getLocaleFromUrl(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
  const withoutPrefix = isEnglish ? (pathname === '/en' ? '/' : pathname.slice(3)) : pathname
  if (target === 'fr') return withoutPrefix
  return withoutPrefix === '/' ? '/en' : `/en${withoutPrefix}`
}
