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
  {
    id: '3',
    createdAt: '2026-01-03T00:00:00Z',
    type: 'pochette-patron',
    titre: 'Burda 5678',
    slug: 'burda-5678',
    categories: ['couture'],
    typeActivite: ['Couture'],
    marqueNom: 'Burda',
    decennieLabel: '1970s',
    caracteristiquesStyle: ['silhouette trapèze'],
    imageUrl: '',
  },
]

describe('filterCatalog', () => {
  it('retourne toutes les entrées sans critère', () => {
    expect(filterCatalog(entries, {})).toHaveLength(3)
  })

  it('filtre par type', () => {
    expect(filterCatalog(entries, { type: 'pochette-patron' })).toEqual([entries[1], entries[2]])
  })

  it('filtre par recherche texte sur le titre, insensible à la casse', () => {
    expect(filterCatalog(entries, { q: 'vogue' })).toEqual([entries[1]])
  })

  it('filtre par recherche texte sur une caractéristique de style (absente du titre)', () => {
    expect(filterCatalog(entries, { q: 'claudine' })).toEqual([entries[1]])
  })

  it('filtre par recherche texte sur le type d’activité (absent du titre)', () => {
    expect(filterCatalog(entries, { q: 'tricot' })).toEqual([entries[0]])
  })

  it('filtre par recherche texte multi-mots en ET (mots répartis sur des champs différents)', () => {
    expect(filterCatalog(entries, { q: 'claudine vogue' })).toEqual([entries[1]])
  })

  it('retourne un tableau vide si un des mots de la recherche multi-mots ne correspond à aucun champ', () => {
    expect(filterCatalog(entries, { q: 'claudine tricot' })).toEqual([])
  })

  it('filtre par recherche texte insensible aux accents', () => {
    expect(filterCatalog(entries, { q: 'trapeze' })).toEqual([entries[2]])
  })

  it('filtre par recherche texte sur la marque et la décennie', () => {
    expect(filterCatalog(entries, { q: 'burda' })).toEqual([entries[2]])
    expect(filterCatalog(entries, { q: '1970s' })).toEqual([entries[2]])
  })

  it('retourne toutes les entrées quand la recherche texte est une chaîne vide', () => {
    expect(filterCatalog(entries, { q: '' })).toHaveLength(3)
  })

  it('retourne un tableau vide quand la recherche texte ne correspond à rien', () => {
    expect(filterCatalog(entries, { q: 'inexistant' })).toEqual([])
  })

  it('filtre par catégorie (une valeur sélectionnée)', () => {
    expect(filterCatalog(entries, { categories: ['couture'] })).toHaveLength(3)
  })

  it('filtre par catégorie avec plusieurs valeurs sélectionnées (union)', () => {
    expect(filterCatalog(entries, { categories: ['couture', 'tricot'] })).toHaveLength(3)
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
    expect(filterCatalog(entries, { typesActivite: ['Couture'] })).toHaveLength(3)
  })
})
