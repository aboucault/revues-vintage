import { describe, expect, it } from 'vitest'
import { filterCatalog } from './filter'
import type { CatalogEntry } from './catalog'

const entries: CatalogEntry[] = [
  {
    id: '1',
    type: 'revue',
    titre: 'Modes & Travaux 1958',
    slug: 'modes-travaux-1958',
    categories: ['couture'],
    decennieLabel: '1950s',
    caracteristiquesStyle: [],
    imageUrl: '',
  },
  {
    id: '2',
    type: 'pochette-patron',
    titre: 'Vogue 1234',
    slug: 'vogue-1234',
    categories: ['couture'],
    marqueNom: 'Vogue',
    decennieLabel: '1960s',
    caracteristiquesStyle: ['col claudine'],
    imageUrl: '',
  },
]

describe('filterCatalog', () => {
  it('retourne toutes les entrées sans critère', () => {
    expect(filterCatalog(entries, {})).toHaveLength(2)
  })

  it('filtre par type', () => {
    expect(filterCatalog(entries, { type: 'pochette-patron' })).toEqual([entries[1]])
  })

  it('filtre par catégorie', () => {
    expect(filterCatalog(entries, { categorie: 'couture' })).toHaveLength(2)
  })

  it('filtre par décennie et marque combinées', () => {
    expect(filterCatalog(entries, { decennieLabel: '1960s', marqueNom: 'Vogue' })).toEqual([entries[1]])
  })

  it('filtre par caractéristique de style', () => {
    expect(filterCatalog(entries, { caracteristiqueStyle: 'col claudine' })).toEqual([entries[1]])
  })

  it('retourne un tableau vide quand rien ne correspond', () => {
    expect(filterCatalog(entries, { marqueNom: 'Butterick' })).toEqual([])
  })
})
