import { describe, expect, it } from 'vitest'
import { buildRevueReaderUrl, canShowRevueReader } from './patronGratuit'

describe('buildRevueReaderUrl', () => {
  it('ajoute l’ancre de page au scan de la revue', () => {
    expect(buildRevueReaderUrl('https://cdn.sanity.io/files/x/y/scan.pdf', 13)).toBe(
      'https://cdn.sanity.io/files/x/y/scan.pdf#page=13',
    )
  })
})

describe('canShowRevueReader', () => {
  it('renvoie true si la revue est domaine public avec des pages renseignées', () => {
    expect(
      canShowRevueReader({
        pages: [13],
        revueScanUrl: 'https://cdn.sanity.io/scan.pdf',
        revueSourceStatutDroits: 'domaine-public',
      }),
    ).toBe(true)
  })

  it('renvoie false si la revue source n’est pas domaine public', () => {
    expect(
      canShowRevueReader({
        pages: [13],
        revueScanUrl: 'https://cdn.sanity.io/scan.pdf',
        revueSourceStatutDroits: 'incertain',
      }),
    ).toBe(false)
  })

  it('renvoie false si aucune page n’est renseignée', () => {
    expect(
      canShowRevueReader({
        pages: [],
        revueScanUrl: 'https://cdn.sanity.io/scan.pdf',
        revueSourceStatutDroits: 'domaine-public',
      }),
    ).toBe(false)
  })

  it('renvoie false si aucune revue n’est liée', () => {
    expect(canShowRevueReader({})).toBe(false)
  })
})
