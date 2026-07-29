import { describe, expect, it } from 'vitest'
import { formatAnneeOuDate, getPrecisionBadge } from './dating'

describe('formatAnneeOuDate', () => {
  it('privilégie la date complète quand elle est connue', () => {
    expect(formatAnneeOuDate(1933, '1933-06-01', 'fr')).toBe('1 juin 1933')
  })

  it("retombe sur l'année seule quand la date complète est absente", () => {
    expect(formatAnneeOuDate(1933, undefined, 'fr')).toBe('1933')
  })

  it('renvoie undefined si ni année ni date ne sont connues', () => {
    expect(formatAnneeOuDate(undefined, undefined, 'fr')).toBeUndefined()
  })
})

describe('getPrecisionBadge', () => {
  const labels = { certaine: 'Date confirmée', deduite: 'Date estimée' }

  it('renvoie le badge "certaine" en variante grisée', () => {
    expect(getPrecisionBadge(true, 'certaine', labels)).toEqual({ label: 'Date confirmée', variant: 'muted' })
  })

  it('renvoie le badge "déduite" en variante grisée', () => {
    expect(getPrecisionBadge(true, 'deduite', labels)).toEqual({ label: 'Date estimée', variant: 'muted' })
  })

  it("ne renvoie rien si aucune date n'est affichée", () => {
    expect(getPrecisionBadge(false, 'certaine', labels)).toBeUndefined()
  })

  it("ne renvoie rien si la précision n'est pas renseignée", () => {
    expect(getPrecisionBadge(true, undefined, labels)).toBeUndefined()
  })
})
