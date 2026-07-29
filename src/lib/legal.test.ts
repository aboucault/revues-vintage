import { describe, expect, it } from 'vitest'
import { getLegalText } from './legal'

describe('getLegalText', () => {
  it('renvoie le texte domaine public en français', () => {
    expect(getLegalText('domaine-public', 'fr')).toBe(
      'Ce document est libre de droits. Vous pouvez le consulter et le télécharger librement à des fins personnelles et non commerciales.'
    )
  })

  it('renvoie le texte domaine public en anglais', () => {
    expect(getLegalText('domaine-public', 'en')).toBe(
      'This document is in the public domain. You can view and download it freely for personal, non-commercial use.'
    )
  })

  it('renvoie le texte statut incertain en français', () => {
    expect(getLegalText('incertain', 'fr')).toBe(
      "Le statut de droits de ce document n'est pas confirmé. Il est présenté ici à titre de référence uniquement."
    )
  })

  it('renvoie le texte statut protégé en français', () => {
    expect(getLegalText('protege', 'fr')).toBe(
      "Ce document est protégé par le droit d'auteur. Il est présenté ici à titre de référence uniquement, sans contenu téléchargeable."
    )
  })
})
