import { describe, expect, it } from 'vitest'
import { buildShareLinks } from './shareLinks'

describe('buildShareLinks', () => {
  it('builds all fixed-network links with encoded url and title', () => {
    const links = buildShareLinks(
      'https://revues-vintage.fr/revues/modes-1958',
      'Modes & Travaux 1958',
      'https://cdn.sanity.io/cover.jpg',
    )

    expect(links.facebook).toBe(
      'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Frevues-vintage.fr%2Frevues%2Fmodes-1958',
    )
    expect(links.x).toBe(
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Frevues-vintage.fr%2Frevues%2Fmodes-1958&text=Modes%20%26%20Travaux%201958',
    )
    expect(links.whatsapp).toBe(
      'https://wa.me/?text=Modes%20%26%20Travaux%201958%20https%3A%2F%2Frevues-vintage.fr%2Frevues%2Fmodes-1958',
    )
    expect(links.email).toBe(
      'mailto:?subject=Modes%20%26%20Travaux%201958&body=https%3A%2F%2Frevues-vintage.fr%2Frevues%2Fmodes-1958',
    )
  })

  it('includes a pinterest link with the media param when an image url is provided', () => {
    const links = buildShareLinks(
      'https://revues-vintage.fr/revues/modes-1958',
      'Modes & Travaux 1958',
      'https://cdn.sanity.io/cover.jpg',
    )

    expect(links.pinterest).toBe(
      'https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Frevues-vintage.fr%2Frevues%2Fmodes-1958&media=https%3A%2F%2Fcdn.sanity.io%2Fcover.jpg&description=Modes%20%26%20Travaux%201958',
    )
  })

  it('omits the pinterest link when no image url is provided', () => {
    const links = buildShareLinks('https://revues-vintage.fr/revues/modes-1958', 'Modes & Travaux 1958')

    expect(links.pinterest).toBeUndefined()
  })

  it('encodes special characters such as accents and ampersands', () => {
    const links = buildShareLinks('https://revues-vintage.fr/pochettes/vogue-1958', 'Été à la mode & vous')

    expect(links.x).toContain('text=%C3%89t%C3%A9%20%C3%A0%20la%20mode%20%26%20vous')
  })
})
