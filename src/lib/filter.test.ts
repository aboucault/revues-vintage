import { describe, expect, it } from 'vitest'
import { filterCatalog } from './filter'
import type { CatalogEntry } from './catalog'

const entries: CatalogEntry[] = [
  {
    id: '1',
    createdAt: '2026-01-01T00:00:00Z',
    type: 'revue',
    titre: 'Modes & Travaux 1958',
    slug: 'modes-travaux-1958',
    categories: ['couture'],
    typeActivite: ['Couture', 'Tricot'],
    decennieLabel: '1950s',
    caracteristiquesStyle: [],
    imageUrl: '',
  },
  {
    id: '2',
    createdAt: '2026-01-02T00:00:00Z',
    type: 'pochette-patron',
    titre: 'Vogue 1234',
    slug: 'vogue-1234',
    categories: ['couture'],
    typeActivite: ['Couture'],
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

  it('filtre par recherche texte sur le titre, insensible à la casse', () => {
    expect(filterCatalog(entries, { q: 'vogue' })).toEqual([entries[1]])
  })

  it('filtre par catégorie (une valeur sélectionnée)', () => {
    expect(filterCatalog(entries, { categories: ['couture'] })).toHaveLength(2)
  })

  it('filtre par catégorie avec plusieurs valeurs sélectionnées (union)', () => {
    expect(filterCatalog(entries, { categories: ['couture', 'tricot'] })).toHaveLength(2)
  })

  it('filtre par décennie et marque combinées (intersection)', () => {
    expect(filterCatalog(entries, { decennies: ['1960s'], marques: ['Vogue'] })).toEqual([entries[1]])
  })

  it('filtre par caractéristique de style', () => {
    expect(filterCatalog(entries, { caracteristiques: ['col claudine'] })).toEqual([entries[1]])
  })

  it('filtre par titre exact (facette "titre de revue")', () => {
    expect(filterCatalog(entries, { titres: ['Modes & Travaux 1958'] })).toEqual([entries[0]])
  })

  it('retourne un tableau vide quand rien ne correspond', () => {
    expect(filterCatalog(entries, { marques: ['Butterick'] })).toEqual([])
  })

  it('filtre par type d’activité (une valeur sélectionnée)', () => {
    expect(filterCatalog(entries, { typesActivite: ['Tricot'] })).toEqual([entries[0]])
  })

  it('filtre par type d’activité avec plusieurs valeurs sélectionnées (union)', () => {
    expect(filterCatalog(entries, { typesActivite: ['Couture'] })).toHaveLength(2)
  })
})
