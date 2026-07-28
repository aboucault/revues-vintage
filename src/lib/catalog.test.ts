import { describe, expect, it } from 'vitest'
import { buildCatalog } from './catalog'
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
