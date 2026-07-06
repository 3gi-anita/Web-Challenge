import { describe, expect, it } from 'vitest'
import { hashString } from '../utils/hash'

describe('hashString', () => {
  it('is deterministic for the same input', () => {
    const url = 'https://example.com/articles/some-story'
    expect(hashString(url)).toBe(hashString(url))
  })

  it('produces different hashes for different inputs', () => {
    expect(hashString('https://example.com/a')).not.toBe(hashString('https://example.com/b'))
  })

  it('always returns an 8-character lowercase hex string', () => {
    const result = hashString('any input at all, of any length whatsoever')
    expect(result).toMatch(/^[0-9a-f]{8}$/)
  })

  it('handles an empty string without throwing', () => {
    expect(() => hashString('')).not.toThrow()
    expect(hashString('')).toMatch(/^[0-9a-f]{8}$/)
  })
})
