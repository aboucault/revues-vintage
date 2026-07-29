import { describe, expect, it } from 'vitest'
import { renderEntryCardHtml } from './card'
import type { CatalogEntry } from './catalog'

function makeEntry(overrides: Partial<CatalogEntry>): CatalogEntry {
  return {
    id: '1',
    createdAt: '2026-01-01T00:00:00Z',
    type: 'revue',
    titre: 'Modes & Travaux',
    slug: 'modes-travaux',
    categories: [],
    caracteristiquesStyle: [],
    imageUrl: '',
    ...overrides,
  }
}

describe('renderEntryCardHtml — français', () => {
  it('encapsule une revue dans un lien vers sa page de détail', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'revue', slug: 'modes-travaux' }), 'fr')
    expect(html).toContain('<a href="/revues/modes-travaux">')
    expect(html).toContain('badge--primary')
    expect(html).toContain('Revue')
  })

  it('encapsule une pochette de patron dans un lien vers sa page de détail', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'pochette-patron', slug: 'vogue-1234' }), 'fr')
    expect(html).toContain('<a href="/patrons/vogue-1234">')
    expect(html).toContain('badge--accent')
    expect(html).toContain('Pochette à dater')
  })

  it('affiche un lien de téléchargement uniquement si telechargementUrl est défini', () => {
    const avecTelechargement = renderEntryCardHtml(
      makeEntry({ type: 'patron-gratuit', slug: 'robe', telechargementUrl: 'https://example.com/f.pdf' }),
      'fr'
    )
    expect(avecTelechargement).toContain('href="https://example.com/f.pdf" download')
    expect(avecTelechargement).toContain('>Télécharger<')

    const sansTelechargement = renderEntryCardHtml(makeEntry({ type: 'patron-gratuit', slug: 'robe' }), 'fr')
    expect(sansTelechargement).not.toContain('card-download')
  })

  it('n’affiche pas de balise img quand imageUrl est vide', () => {
    const html = renderEntryCardHtml(makeEntry({ imageUrl: '' }), 'fr')
    expect(html).not.toContain('<img')
  })
})

describe('renderEntryCardHtml — anglais', () => {
  it('préfixe le lien de la revue par /en et traduit le badge', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'revue', slug: 'modes-travaux' }), 'en')
    expect(html).toContain('<a href="/en/revues/modes-travaux">')
    expect(html).toContain('Magazine')
  })

  it('traduit le texte de téléchargement', () => {
    const html = renderEntryCardHtml(
      makeEntry({ type: 'patron-gratuit', slug: 'robe', telechargementUrl: 'https://example.com/f.pdf' }),
      'en'
    )
    expect(html).toContain('>Download<')
  })
})
