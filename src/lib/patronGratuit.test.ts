import { describe, expect, it } from 'vitest'
import { canShowGalerie, canShowTranslation } from './patronGratuit'

describe('canShowGalerie', () => {
  it('renvoie true si la revue est domaine public avec des vignettes et un slug', () => {
    expect(
      canShowGalerie({
        couverturesUrls: ['https://cdn.sanity.io/page-13.png'],
        revueSourceStatutDroits: 'domaine-public',
        revueSourceSlug: 'le-petit-echo-de-la-mode-3',
      }),
    ).toBe(true)
  })

  it('renvoie false si la revue source n’est pas domaine public', () => {
    expect(
      canShowGalerie({
        couverturesUrls: ['https://cdn.sanity.io/page-13.png'],
        revueSourceStatutDroits: 'incertain',
        revueSourceSlug: 'le-petit-echo-de-la-mode-3',
      }),
    ).toBe(false)
  })

  it('renvoie false si aucune vignette n’est générée', () => {
    expect(
      canShowGalerie({
        couverturesUrls: [],
        revueSourceStatutDroits: 'domaine-public',
        revueSourceSlug: 'le-petit-echo-de-la-mode-3',
      }),
    ).toBe(false)
  })

  it('renvoie false si le slug de la revue source est absent', () => {
    expect(
      canShowGalerie({
        couverturesUrls: ['https://cdn.sanity.io/page-13.png'],
        revueSourceStatutDroits: 'domaine-public',
      }),
    ).toBe(false)
  })

  it('renvoie false si aucune revue n’est liée', () => {
    expect(canShowGalerie({})).toBe(false)
  })
})

describe('canShowTranslation', () => {
  it('renvoie true en anglais si la traduction est renseignée', () => {
    expect(canShowTranslation({ traductionInstructionsEn: 'Cast on 40 stitches...' }, 'en')).toBe(true)
  })

  it('renvoie false en anglais si la traduction est absente', () => {
    expect(canShowTranslation({}, 'en')).toBe(false)
  })

  it('renvoie false en français même si la traduction est renseignée', () => {
    expect(canShowTranslation({ traductionInstructionsEn: 'Cast on 40 stitches...' }, 'fr')).toBe(false)
  })
})
