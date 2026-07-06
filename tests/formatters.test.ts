import { describe, expect, it } from 'vitest'
import { estimateReadingTime, formatPublishedDate, formatRelativeTime, truncateText } from '../utils/formatters'

describe('formatPublishedDate', () => {
  it('formats a valid ISO date as "D MMM YYYY"', () => {
    expect(formatPublishedDate('2025-03-07T09:12:00Z')).toBe('7 Mar 2025')
  })

  it('falls back to "Undated" for missing input', () => {
    expect(formatPublishedDate(null)).toBe('Undated')
    expect(formatPublishedDate(undefined)).toBe('Undated')
  })

  it('falls back to "Undated" for unparseable input instead of "Invalid Date"', () => {
    expect(formatPublishedDate('not-a-date')).toBe('Undated')
  })
})

describe('formatRelativeTime', () => {
  const now = new Date('2025-03-07T12:00:00Z').getTime()

  it('formats minutes and hours ago', () => {
    expect(formatRelativeTime('2025-03-07T11:50:00Z', now)).toBe('10m ago')
    expect(formatRelativeTime('2025-03-07T02:00:00Z', now)).toBe('10h ago')
  })

  it('formats days ago within a week', () => {
    expect(formatRelativeTime('2025-03-05T12:00:00Z', now)).toBe('2d ago')
  })

  it('falls back to the absolute date once a week or more has passed', () => {
    expect(formatRelativeTime('2025-02-01T12:00:00Z', now)).toBe('1 Feb 2025')
  })

  it('falls back to "Undated" for missing or unparseable input', () => {
    expect(formatRelativeTime(null, now)).toBe('Undated')
    expect(formatRelativeTime('not-a-date', now)).toBe('Undated')
  })
})

describe('estimateReadingTime', () => {
  it('returns 1 for empty or missing text', () => {
    expect(estimateReadingTime(null)).toBe(1)
    expect(estimateReadingTime(undefined)).toBe(1)
    expect(estimateReadingTime('')).toBe(1)
  })

  it('estimates roughly word-count / 200, rounded, minimum 1', () => {
    const words = Array(400).fill('word').join(' ')
    expect(estimateReadingTime(words)).toBe(2)
  })

  it('never returns less than 1 minute for short text', () => {
    expect(estimateReadingTime('just a few words here')).toBe(1)
  })
})

describe('truncateText', () => {
  it('returns short text unchanged', () => {
    expect(truncateText('short text', 100)).toBe('short text')
  })

  it('truncates on a word boundary and appends an ellipsis', () => {
    const result = truncateText('The quick brown fox jumps over the lazy dog', 15)
    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(16)
    expect(result).not.toMatch(/\s…$/) // no dangling space before the ellipsis
  })
})
