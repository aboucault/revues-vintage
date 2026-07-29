import { describe, expect, it } from 'vitest'
import { paginate } from './pagination'

describe('paginate', () => {
  const items = Array.from({ length: 30 }, (_, i) => i + 1) // [1..30]

  it('retourne la première page avec pageSize éléments', () => {
    const result = paginate(items, 1, 12)
    expect(result.items).toEqual(Array.from({ length: 12 }, (_, i) => i + 1))
    expect(result.totalPages).toBe(3)
    expect(result.page).toBe(1)
  })

  it('retourne la dernière page même partielle', () => {
    const result = paginate(items, 3, 12)
    expect(result.items).toEqual([25, 26, 27, 28, 29, 30])
    expect(result.totalPages).toBe(3)
    expect(result.page).toBe(3)
  })

  it('ramène une page négative ou nulle à 1', () => {
    expect(paginate(items, 0, 12).page).toBe(1)
    expect(paginate(items, -5, 12).page).toBe(1)
  })

  it('ramène une page au-delà du total à la dernière page', () => {
    const result = paginate(items, 99, 12)
    expect(result.page).toBe(3)
    expect(result.items).toEqual([25, 26, 27, 28, 29, 30])
  })

  it('gère une liste vide (1 page, 0 élément, page 1)', () => {
    const result = paginate([], 1, 12)
    expect(result).toEqual({ items: [], totalPages: 1, page: 1 })
  })

  it('gère un pageSize plus grand que la liste (1 seule page)', () => {
    const result = paginate([1, 2, 3], 1, 12)
    expect(result).toEqual({ items: [1, 2, 3], totalPages: 1, page: 1 })
  })
})
