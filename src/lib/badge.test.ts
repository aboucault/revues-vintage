import { describe, expect, it } from 'vitest'
import { getBadgeLabel, getBadgeVariant } from './badge'

describe('getBadgeLabel', () => {
  it('retourne "Revue" pour une revue en français', () => {
    expect(getBadgeLabel('revue', 'fr')).toBe('Revue')
  })

  it('retourne "Pochette à dater" pour une pochette de patron en français', () => {
    expect(getBadgeLabel('pochette-patron', 'fr')).toBe('Pochette à dater')
  })

  it('retourne "Patron gratuit" pour un patron gratuit en français', () => {
    expect(getBadgeLabel('patron-gratuit', 'fr')).toBe('Patron gratuit')
  })

  it('retourne "Magazine" pour une revue en anglais', () => {
    expect(getBadgeLabel('revue', 'en')).toBe('Magazine')
  })

  it('retourne "Pattern to date" pour une pochette de patron en anglais', () => {
    expect(getBadgeLabel('pochette-patron', 'en')).toBe('Pattern to date')
  })

  it('retourne "Free pattern" pour un patron gratuit en anglais', () => {
    expect(getBadgeLabel('patron-gratuit', 'en')).toBe('Free pattern')
  })
})

describe('getBadgeVariant', () => {
  it('utilise la variante accent uniquement pour une pochette de patron', () => {
    expect(getBadgeVariant('pochette-patron')).toBe('accent')
  })

  it('utilise la variante primary pour une revue', () => {
    expect(getBadgeVariant('revue')).toBe('primary')
  })

  it('utilise la variante primary pour un patron gratuit', () => {
    expect(getBadgeVariant('patron-gratuit')).toBe('primary')
  })
})
