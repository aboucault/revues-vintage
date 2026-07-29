import { describe, expect, it } from 'vitest'
import { getCardSubtitleLines, renderEntryCardHtml } from './card'
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
    expect(html).toContain('href="/revues/modes-travaux"')
  })

  it('encapsule une pochette de patron dans un lien vers sa page de détail', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'pochette-patron', slug: 'vogue-1234' }), 'fr')
    expect(html).toContain('href="/patrons/vogue-1234"')
  })

  it('n’affiche jamais de bandeau de type (réservé à la page d’accueil)', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'revue', slug: 'modes-travaux' }), 'fr')
    expect(html).not.toContain('card-badge')
    expect(html).not.toContain('Revue')
  })

  it('affiche le numéro puis la date sur une seule ligne de sous-titre', () => {
    const html = renderEntryCardHtml(
      makeEntry({ type: 'revue', slug: 'modes-travaux', dateParution: '1930-09-28', numero: '39', annee: 1930 }),
      'fr'
    )
    expect(html).toContain('<span class="card-subtitle">n°39 · 28 septembre 1930</span>')
  })

  it('affiche un bouton rond de téléchargement uniquement si telechargementUrl est défini', () => {
    const avecTelechargement = renderEntryCardHtml(
      makeEntry({ type: 'patron-gratuit', slug: 'robe', telechargementUrl: 'https://example.com/f.pdf' }),
      'fr'
    )
    expect(avecTelechargement).toContain('href="https://example.com/f.pdf" download')
    expect(avecTelechargement).toContain('class="card-download"')
    expect(avecTelechargement).toContain('aria-label="Télécharger"')

    const sansTelechargement = renderEntryCardHtml(makeEntry({ type: 'patron-gratuit', slug: 'robe' }), 'fr')
    expect(sansTelechargement).not.toContain('card-download')
  })

  it('n’affiche pas de balise img quand imageUrl est vide', () => {
    const html = renderEntryCardHtml(makeEntry({ imageUrl: '' }), 'fr')
    expect(html).not.toContain('<img')
  })
})

describe('renderEntryCardHtml — anglais', () => {
  it('préfixe le lien de la revue par /en', () => {
    const html = renderEntryCardHtml(makeEntry({ type: 'revue', slug: 'modes-travaux' }), 'en')
    expect(html).toContain('href="/en/revues/modes-travaux"')
  })

  it('traduit le libellé accessible du bouton de téléchargement', () => {
    const html = renderEntryCardHtml(
      makeEntry({ type: 'patron-gratuit', slug: 'robe', telechargementUrl: 'https://example.com/f.pdf' }),
      'en'
    )
    expect(html).toContain('aria-label="Download"')
  })
})

describe('getCardSubtitleLines', () => {
  it('affiche le numéro puis la date formatée quand les deux sont connus', () => {
    const lines = getCardSubtitleLines(
      makeEntry({ dateParution: '1930-09-28', numero: '39', annee: 1930 }),
      'fr'
    )
    expect(lines).toEqual(['n°39', '28 septembre 1930'])
  })

  it('affiche seulement la date quand le numéro est absent', () => {
    const lines = getCardSubtitleLines(makeEntry({ dateParution: '1930-09-28', annee: 1930 }), 'fr')
    expect(lines).toEqual(['28 septembre 1930'])
  })

  it('retombe sur la décennie quand ni date ni année ne sont connues', () => {
    const lines = getCardSubtitleLines(makeEntry({ decennieLabel: '1930-1940', numero: '39' }), 'fr')
    expect(lines).toEqual(['n°39', '1930-1940'])
  })

  it('ne renvoie rien si aucune information n’est disponible', () => {
    expect(getCardSubtitleLines(makeEntry({}), 'fr')).toEqual([])
  })

  it('traduit le préfixe du numéro en anglais', () => {
    const lines = getCardSubtitleLines(makeEntry({ dateParution: '1930-09-28', numero: '39', annee: 1930 }), 'en')
    expect(lines).toEqual(['No. 39', 'September 28, 1930'])
  })
})
