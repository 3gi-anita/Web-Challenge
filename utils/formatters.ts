const WORDS_PER_MINUTE = 200
const DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})


export function formatPublishedDate(iso: string | null | undefined): string {
  if (!iso) return 'Undated'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Undated'
  return DATE_FORMATTER.format(date)
}


export function formatRelativeTime(iso: string | null | undefined, now: number = Date.now()): string {
  if (!iso) return 'Undated'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Undated'

  const diffMs = now - date.getTime()
  if (diffMs < 0) return formatPublishedDate(iso)

  const diffMinutes = Math.round(diffMs / 60_000)
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`

  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.round(diffHours / 24)
  if (diffDays < 7) return `${diffDays}d ago`

  return formatPublishedDate(iso)
}

export function estimateReadingTime(text: string | null | undefined): number {
  if (!text) return 1
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  const sliced = text.slice(0, maxLength)
  const lastSpace = sliced.lastIndexOf(' ')
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}
