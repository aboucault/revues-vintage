import { describe, expect, it } from 'vitest'
import { formatDateParution, getRevueDisplayTitre } from './revueDetail'

describe('formatDateParution', () => {
  it('formate une date ISO en toutes lettres en français', () => {
    expect(formatDateParution('1947-01-19', 'fr')).toBe('19 janvier 1947')
  })

  it('formate une date ISO en toutes lettres en anglais', () => {
    expect(formatDateParution('1947-01-19', 'en')).toBe('January 19, 1947')
  })

  it('renvoie undefined si la date est absente', () => {
    expect(formatDateParution(undefined, 'fr')).toBeUndefined()
  })
})

describe('getRevueDisplayTitre', () => {
  it('ajoute la date formatée au titre quand elle est connue', () => {
    expect(getRevueDisplayTitre('Le Petit Écho de la Mode', '1947-01-19', 'fr')).toBe(
      'Le Petit Écho de la Mode — 19 janvier 1947'
    )
  })

  it('renvoie le titre seul quand la date est absente', () => {
    expect(getRevueDisplayTitre('Le Petit Écho de la Mode', undefined, 'fr')).toBe('Le Petit Écho de la Mode')
  })
})
