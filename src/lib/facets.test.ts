import { describe, expect, it } from 'vitest'
import { buildFacetOptions } from './facets'

describe('buildFacetOptions', () => {
  it('compte les occurrences de chaque valeur', () => {
    expect(buildFacetOptions(['couture', 'tricot', 'couture'])).toEqual([
      { value: 'couture', count: 2 },
      { value: 'tricot', count: 1 },
    ])
  })

  it('trie les options par ordre alphabétique français', () => {
    expect(buildFacetOptions(['tricot', 'broderie', 'crochet'])).toEqual([
      { value: 'broderie', count: 1 },
      { value: 'crochet', count: 1 },
      { value: 'tricot', count: 1 },
    ])
  })

  it('retourne un tableau vide sans valeurs', () => {
    expect(buildFacetOptions([])).toEqual([])
  })
})
