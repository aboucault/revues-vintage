import { describe, expect, it } from 'vitest'
import {
  buildRevueFallbackDescription,
  buildPatronGratuitFallbackDescription,
  buildPochetteFallbackDescription,
} from './seo'

describe('buildRevueFallbackDescription', () => {
  it('inclut la décennie en français quand elle est connue', () => {
    expect(buildRevueFallbackDescription('Modes & Travaux 1958', 'années 1950', 'fr')).toBe(
      'Modes & Travaux 1958, revue de mode vintage des années 1950, à consulter sur Les Revues Vintage.',
    )
  })

  it('omet la décennie en français quand elle est inconnue', () => {
    expect(buildRevueFallbackDescription('La Coquette', undefined, 'fr')).toBe(
      'La Coquette, revue de mode vintage à consulter sur Les Revues Vintage.',
    )
  })

  it('inclut la décennie en anglais quand elle est connue', () => {
    expect(buildRevueFallbackDescription('Modes & Travaux 1958', '1950s', 'en')).toBe(
      'Modes & Travaux 1958, a vintage fashion magazine from the 1950s, to browse on Revues Vintage.',
    )
  })

  it('omet la décennie en anglais quand elle est inconnue', () => {
    expect(buildRevueFallbackDescription('La Coquette', undefined, 'en')).toBe(
      'La Coquette, a vintage fashion magazine to browse on Revues Vintage.',
    )
  })
})

describe('buildPatronGratuitFallbackDescription', () => {
  it('génère une description en français', () => {
    expect(buildPatronGratuitFallbackDescription('Robe à smocks', 'fr')).toBe(
      'Robe à smocks — patron de couture vintage gratuit à télécharger sur Les Revues Vintage.',
    )
  })

  it('génère une description en anglais', () => {
    expect(buildPatronGratuitFallbackDescription('Robe à smocks', 'en')).toBe(
      'Robe à smocks — a free vintage sewing pattern to download on Revues Vintage.',
    )
  })
})

describe('buildPochetteFallbackDescription', () => {
  it('inclut la marque en français quand elle est connue', () => {
    expect(buildPochetteFallbackDescription('Chic et Pratique 9179', 'Chic et Pratique', 'fr')).toBe(
      'Chic et Pratique 9179 (Chic et Pratique) — pochette de patron ancien à dater sur Les Revues Vintage.',
    )
  })

  it('omet la marque en français quand elle est inconnue', () => {
    expect(buildPochetteFallbackDescription('Pochette sans marque', undefined, 'fr')).toBe(
      'Pochette sans marque — pochette de patron ancien à dater sur Les Revues Vintage.',
    )
  })

  it('inclut la marque en anglais quand elle est connue', () => {
    expect(buildPochetteFallbackDescription('Chic et Pratique 9179', 'Chic et Pratique', 'en')).toBe(
      'Chic et Pratique 9179 (Chic et Pratique) — a vintage pattern envelope to date on Revues Vintage.',
    )
  })
})
