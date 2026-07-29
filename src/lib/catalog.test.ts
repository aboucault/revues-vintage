import { describe, expect, it } from 'vitest'
import { buildCatalog, getEntryPath } from './catalog'
import type { CatalogEntry } from './catalog'
import type { PatronGratuitDoc, PochettePatronDoc, RevueDoc } from './sanity'

const baseRevue: RevueDoc = {
  _id: 'r1',
  _createdAt: '2026-01-10T09:00:00Z',
  titre: 'Modes & Travaux 1958',
  slug: 'modes-travaux-1958',
  categories: ['couture'],
  statutDroits: 'domaine-public',
  apercuPagesUrls: [],
  urlScanComplet: 'https://r2.example.com/scan.pdf',
}

describe('buildCatalog — revues', () => {
  it('expose l’URL de téléchargement quand le statut est domaine public', () => {
    const [entry] = buildCatalog([baseRevue], [], [])
    expect(entry.telechargementUrl).toBe('https://r2.example.com/scan.pdf')
  })

  it('masque l’URL de téléchargement quand le statut n’est pas domaine public', () => {
    const revueProtegee: RevueDoc = { ...baseRevue, statutDroits: 'protege' }
    const [entry] = buildCatalog([revueProtegee], [], [])
    expect(entry.telechargementUrl).toBeUndefined()
  })

  it('reporte la date de création Sanity sur l’entrée de catalogue', () => {
    const [entry] = buildCatalog([baseRevue], [], [])
    expect(entry.createdAt).toBe('2026-01-10T09:00:00Z')
  })
})

describe('buildCatalog — pochettes de patron', () => {
  it('n’expose jamais d’URL de téléchargement, quel que soit le statut', () => {
    const pochette: PochettePatronDoc = {
      _id: 'p1',
      _createdAt: '2026-02-01T09:00:00Z',
      titre: 'Vogue 1234',
      slug: 'vogue-1234',
      categories: ['couture'],
      caracteristiquesStyle: ['col claudine'],
      imageRectoUrl: 'https://cdn.sanity.io/recto.jpg',
      statutDroits: 'incertain',
    }
    const [entry] = buildCatalog([], [pochette], [])
    expect(entry.telechargementUrl).toBeUndefined()
    expect(entry.type).toBe('pochette-patron')
    expect(entry.createdAt).toBe('2026-02-01T09:00:00Z')
  })
})

describe('buildCatalog — patrons gratuits', () => {
  it('expose l’URL de téléchargement quand le statut est domaine public', () => {
    const patron: PatronGratuitDoc = {
      _id: 'g1',
      _createdAt: '2026-03-01T09:00:00Z',
      titre: 'Robe à smocks',
      slug: 'robe-a-smocks',
      categories: ['couture'],
      statutDroits: 'domaine-public',
      fichierUrl: 'https://cdn.sanity.io/patron.pdf',
    }
    const [entry] = buildCatalog([], [], [patron])
    expect(entry.telechargementUrl).toBe('https://cdn.sanity.io/patron.pdf')
    expect(entry.createdAt).toBe('2026-03-01T09:00:00Z')
  })

  it('masque l’URL de téléchargement quand le statut est incertain', () => {
    const patron: PatronGratuitDoc = {
      _id: 'g2',
      _createdAt: '2026-03-02T09:00:00Z',
      titre: 'Robe à smocks',
      slug: 'robe-a-smocks',
      categories: ['couture'],
      statutDroits: 'incertain',
      fichierUrl: 'https://cdn.sanity.io/patron.pdf',
    }
    const [entry] = buildCatalog([], [], [patron])
    expect(entry.telechargementUrl).toBeUndefined()
  })
})

function makeEntry(overrides: Partial<CatalogEntry>): CatalogEntry {
  return {
    id: '1',
    createdAt: '2026-01-01T00:00:00Z',
    type: 'revue',
    titre: 'Titre',
    slug: 'un-titre',
    categories: [],
    caracteristiquesStyle: [],
    imageUrl: '',
    ...overrides,
  }
}

describe('getEntryPath', () => {
  it('pointe vers /revues/<slug> pour une revue', () => {
    expect(getEntryPath(makeEntry({ type: 'revue', slug: 'un-titre' }))).toBe('/revues/un-titre')
  })

  it('pointe vers /ressources-gratuites/<slug> pour un patron gratuit', () => {
    expect(getEntryPath(makeEntry({ type: 'patron-gratuit', slug: 'un-patron' }))).toBe(
      '/ressources-gratuites/un-patron'
    )
  })

  it('pointe vers /patrons/<slug> pour une pochette de patron', () => {
    expect(getEntryPath(makeEntry({ type: 'pochette-patron', slug: 'une-pochette' }))).toBe('/patrons/une-pochette')
  })
})
