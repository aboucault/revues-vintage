import { describe, expect, it, vi } from 'vitest'

const fetchMock = vi.fn()

vi.mock('@sanity/client', () => ({
  createClient: () => ({ fetch: fetchMock }),
}))

describe('fetchRevues', () => {
  it('interroge Sanity avec la requête GROQ des revues et retourne le résultat', async () => {
    const { fetchRevues } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '1', titre: 'Modes & Travaux 1958' }])

    const result = await fetchRevues()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "revue"'))
    expect(result).toEqual([{ _id: '1', titre: 'Modes & Travaux 1958' }])
  })
})

describe('fetchPochettesPatron', () => {
  it('interroge Sanity avec la requête GROQ des pochettes de patron', async () => {
    const { fetchPochettesPatron } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '2', titre: 'Vogue 1234' }])

    const result = await fetchPochettesPatron()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "pochettePatron"'))
    expect(result).toEqual([{ _id: '2', titre: 'Vogue 1234' }])
  })
})

describe('fetchPatronsGratuits', () => {
  it('interroge Sanity avec la requête GROQ des patrons gratuits', async () => {
    const { fetchPatronsGratuits } = await import('./sanity')
    fetchMock.mockResolvedValueOnce([{ _id: '3', titre: 'Robe à smocks' }])

    const result = await fetchPatronsGratuits()

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('_type == "patronGratuit"'))
    expect(result).toEqual([{ _id: '3', titre: 'Robe à smocks' }])
  })
})
