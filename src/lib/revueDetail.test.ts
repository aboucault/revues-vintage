import { describe, expect, it } from 'vitest'
import { formatDateParution } from './revueDetail'

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
