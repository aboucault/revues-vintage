import { describe, expect, it } from 'vitest'
import { sortEntries } from './sort'
import type { CatalogEntry } from './catalog'

function makeEntry(overrides: Partial<CatalogEntry>): CatalogEntry {
  return {
    id: '1',
    createdAt: '2026-01-01T00:00:00Z',
    type: 'revue',
    titre: 'Titre',
    slug: 'titre',
    categories: [],
    caracteristiquesStyle: [],
    imageUrl: '',
    ...overrides,
  }
}

describe('sortEntries', () => {
  it('trie par date de création décroissante avec "recent"', () => {
    const older = makeEntry({ id: 'a', titre: 'A', createdAt: '2026-01-01T00:00:00Z' })
    const newer = makeEntry({ id: 'b', titre: 'B', createdAt: '2026-03-01T00:00:00Z' })
    expect(sortEntries([older, newer], 'recent')).toEqual([newer, older])
  })

  it('trie par titre alphabétique croissant avec "titre-asc"', () => {
    const b = makeEntry({ id: 'b', titre: 'Béatrice' })
    const a = makeEntry({ id: 'a', titre: 'Anna' })
    expect(sortEntries([b, a], 'titre-asc')).toEqual([a, b])
  })

  it('ne modifie pas le tableau d’origine', () => {
    const entries = [makeEntry({ id: 'a' }), makeEntry({ id: 'b' })]
    const original = [...entries]
    sortEntries(entries, 'titre-asc')
    expect(entries).toEqual(original)
  })
})
