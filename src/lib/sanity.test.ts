import { describe, expect, it, vi } from 'vitest'

const fetchMock = vi.fn()

vi.mock('@sanity/client', () => ({
  createClient: () => ({ fetch: fetchMock }),
}))

describe('fetchRevues', () => {
  it('interroge Sanity avec la requête GROQ des revues et la locale demandée', async () => {
    const { fetchRevues } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '1', titre: 'Modes & Travaux 1958', dateParution: '1958-03-12' }])

    const result = await fetchRevues('fr')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "revue"'), { locale: 'fr' })
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('dateParution'), { locale: 'fr' })
    expect(result).toEqual([{ _id: '1', titre: 'Modes & Travaux 1958', dateParution: '1958-03-12' }])
  })
})

describe('fetchPochettesPatron', () => {
  it('interroge Sanity avec la requête GROQ des pochettes de patron et la locale demandée', async () => {
    const { fetchPochettesPatron } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '2', titre: 'Vogue 1234' }])

    const result = await fetchPochettesPatron('en')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "pochettePatron"'), { locale: 'en' })
    expect(result).toEqual([{ _id: '2', titre: 'Vogue 1234' }])
  })
})

describe('fetchPatronsGratuits', () => {
  it('interroge Sanity avec la requête GROQ des patrons gratuits et la locale demandée', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '3', titre: 'Robe à smocks' }])

    const result = await fetchPatronsGratuits('fr')

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "patronGratuit"'), { locale: 'fr' })
    expect(result).toEqual([{ _id: '3', titre: 'Robe à smocks' }])
  })
})
