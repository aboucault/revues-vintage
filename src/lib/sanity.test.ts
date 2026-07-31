import { describe, expect, it, vi } from 'vitest'

const fetchMock = vi.fn()

vi.mock('@sanity/client', () => ({
  createClient: () => ({ fetch: fetchMock }),
}))

describe('localizeTypeActivite', () => {
  it('traduit les clés brutes en français', async () => {
    const { localizeTypeActivite } = await import('./sanity')
    expect(localizeTypeActivite(['couture', 'mode'], 'fr')).toEqual(['Couture', 'Mode'])
  })

  it('traduit les clés brutes en anglais', async () => {
    const { localizeTypeActivite } = await import('./sanity')
    expect(localizeTypeActivite(['couture', 'broderie'], 'en')).toEqual(['Sewing', 'Embroidery'])
  })

  it('renvoie la clé brute telle quelle si elle est inconnue', async () => {
    const { localizeTypeActivite } = await import('./sanity')
    expect(localizeTypeActivite(['inconnu'], 'fr')).toEqual(['inconnu'])
  })

  it('renvoie un tableau vide pour une entrée vide', async () => {
    const { localizeTypeActivite } = await import('./sanity')
    expect(localizeTypeActivite([], 'fr')).toEqual([])
  })
})

describe('fetchRevues', () => {
  it('interroge Sanity avec la requête GROQ des revues et la locale demandée', async () => {
    const { fetchRevues } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([
      { _id: '1', titre: 'Modes & Travaux 1958', dateParution: '1958-03-12', typeActivite: ['couture'] },
    ])

    const result = await fetchRevues('fr')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "revue"'), { locale: 'fr' })
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('dateParution'), { locale: 'fr' })
    expect(result).toEqual([
      { _id: '1', titre: 'Modes & Travaux 1958', dateParution: '1958-03-12', typeActivite: ['Couture'] },
    ])
  })
})

describe('fetchPochettesPatron', () => {
  it('interroge Sanity avec la requête GROQ des pochettes de patron et la locale demandée', async () => {
    const { fetchPochettesPatron } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '2', titre: 'Vogue 1234', typeActivite: ['broderie'] }])

    const result = await fetchPochettesPatron('en')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "pochettePatron"'), { locale: 'en' })
    expect(result).toEqual([{ _id: '2', titre: 'Vogue 1234', typeActivite: ['Embroidery'] }])
  })
})

describe('fetchPatronsGratuits', () => {
  it('interroge Sanity avec la requête GROQ des patrons gratuits et la locale demandée', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '3', titre: 'Robe à smocks', typeActivite: ['mode'] }])

    const result = await fetchPatronsGratuits('fr')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "patronGratuit"'), { locale: 'fr' })
    expect(result).toEqual([{ _id: '3', titre: 'Robe à smocks', typeActivite: ['Mode'] }])
  })

  it('récupère les pages et le slug de la revue source pour la galerie', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([])

    await fetchPatronsGratuits('fr')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('pages'), { locale: 'fr' })
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('revueSourceSlug'), { locale: 'fr' })
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('revueSourceStatutDroits'), { locale: 'fr' })
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('revueSourceTitre'), { locale: 'fr' })
  })

  it('récupère les vignettes de couverture (une par page)', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([])

    await fetchPatronsGratuits('fr')

    const patronGratuitCall = fetchMock.mock.calls.find(([query]) => query.includes('_type == "patronGratuit"'))
    expect(patronGratuitCall?.[0]).toContain('couverturesUrls')
  })

  it('récupère les métadonnées de la revue source pour le bandeau de lien', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([])

    await fetchPatronsGratuits('fr')

    const patronGratuitCall = fetchMock.mock.calls.find(([query]) => query.includes('_type == "patronGratuit"'))
    expect(patronGratuitCall?.[0]).toContain('revueSourceCouvertureUrl')
    expect(patronGratuitCall?.[0]).toContain('revueSourceNumero')
    expect(patronGratuitCall?.[0]).toContain('revueSourceAnnee')
    expect(patronGratuitCall?.[0]).toContain('revueSourceDateParution')
    expect(patronGratuitCall?.[0]).toContain('revueSourceDecennieLabel')
  })

  it('projette le titre selon la locale demandée', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([])

    await fetchPatronsGratuits('en')

    const patronGratuitCall = fetchMock.mock.calls.find(([query]) => query.includes('_type == "patronGratuit"'))
    expect(patronGratuitCall?.[0]).toContain('"titre": titre[$locale]')
  })

  it('récupère la traduction anglaise des instructions', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([])

    await fetchPatronsGratuits('en')

    const patronGratuitCall = fetchMock.mock.calls.find(([query]) => query.includes('_type == "patronGratuit"'))
    expect(patronGratuitCall?.[0]).toContain('traductionInstructionsEn')
  })
})
