import type { Locale } from '../i18n'

export function buildRevueFallbackDescription(
  titre: string,
  decennieLabel: string | undefined,
  locale: Locale,
): string {
  if (locale === 'en') {
    return decennieLabel
      ? `${titre}, a vintage fashion magazine from the ${decennieLabel}, to browse on Revues Vintage.`
      : `${titre}, a vintage fashion magazine to browse on Revues Vintage.`
  }
  return decennieLabel
    ? `${titre}, revue de mode vintage des ${decennieLabel}, à consulter sur Les Revues Vintage.`
    : `${titre}, revue de mode vintage à consulter sur Les Revues Vintage.`
}

export function buildPatronGratuitFallbackDescription(titre: string, locale: Locale): string {
  if (locale === 'en') return `${titre} — a free vintage sewing pattern to download on Revues Vintage.`
  return `${titre} — patron de couture vintage gratuit à télécharger sur Les Revues Vintage.`
}

export function buildPochetteFallbackDescription(
  titre: string,
  marqueNom: string | undefined,
  locale: Locale,
): string {
  if (locale === 'en') {
    return marqueNom
      ? `${titre} (${marqueNom}) — a vintage pattern envelope to date on Revues Vintage.`
      : `${titre} — a vintage pattern envelope to date on Revues Vintage.`
  }
  return marqueNom
    ? `${titre} (${marqueNom}) — pochette de patron ancien à dater sur Les Revues Vintage.`
    : `${titre} — pochette de patron ancien à dater sur Les Revues Vintage.`
}
