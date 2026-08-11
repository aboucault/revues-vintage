import { describe, expect, it } from 'vitest'
import { buildFilterEvent, buildSearchEvent, buildShareEvent } from './analyticsEvents'
import type { ShareMethod } from './analyticsEvents'

describe('buildFilterEvent', () => {
  it('builds a filter_used payload with type and value', () => {
    expect(buildFilterEvent('decennies', '1950s')).toEqual({
      event: 'filter_used',
      filter_type: 'decennies',
      filter_value: '1950s',
    })
  })
})

describe('buildSearchEvent', () => {
  it('builds a search_used payload with the query', () => {
    expect(buildSearchEvent('robe smocks')).toEqual({
      event: 'search_used',
      query: 'robe smocks',
    })
  })
})

describe('buildShareEvent', () => {
  it('builds a share payload with content type, slug and method', () => {
    expect(buildShareEvent('pochette', 'vogue-1234', 'pinterest')).toEqual({
      event: 'share',
      content_type: 'pochette',
      slug: 'vogue-1234',
      method: 'pinterest',
    })
  })

  it('supports the revue content type', () => {
    expect(buildShareEvent('revue', 'modes-travaux-1958', 'copy_link')).toEqual({
      event: 'share',
      content_type: 'revue',
      slug: 'modes-travaux-1958',
      method: 'copy_link',
    })
  })

  it('supports every share method', () => {
    const methods: ShareMethod[] = ['pinterest', 'facebook', 'x', 'whatsapp', 'email', 'copy_link', 'native']
    methods.forEach((method) => {
      expect(buildShareEvent('patron', 'slug', method).method).toBe(method)
    })
  })
})
