import { describe, expect, it } from 'vitest'
import { getBadgeLabel, getBadgeVariant } from './badge'

describe('getBadgeLabel', () => {
  it('retourne "Revue" pour une revue', () => {
    expect(getBadgeLabel('revue')).toBe('Revue')
  })

  it('retourne "Pochette à dater" pour une pochette de patron', () => {
    expect(getBadgeLabel('pochette-patron')).toBe('Pochette à dater')
  })

  it('retourne "Patron gratuit" pour un patron gratuit', () => {
    expect(getBadgeLabel('patron-gratuit')).toBe('Patron gratuit')
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
