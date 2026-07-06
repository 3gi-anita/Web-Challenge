import type { ApiArticle, ApiArticleSource } from '~/models/api/article.api'
import type { Article, ArticleSource } from '~/models/domain/article'
import { hashString } from './hash'
import { estimateReadingTime, formatPublishedDate } from './formatters'


const MIN_USABLE_CONTENT_LENGTH = 40

function cleanContent(rawContent: string | null | undefined): string | null {
  if (!rawContent) return null
  const withoutTruncationMarker = rawContent.replace(/\s*\[\+\d+[\s\S]*$/, '').trim()
  return withoutTruncationMarker.length > 0 ? withoutTruncationMarker : null
}

function resolveNullableString(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function resolveImageUrl(value: string | null | undefined): string | null {
  const resolved = resolveNullableString(value)
  if (!resolved) return null
  try {
    const parsed = new URL(resolved)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? resolved : null
  } catch {
    return null
  }
}

function resolveSource(source: ApiArticleSource | null | undefined): ArticleSource {
  return {
    id: source?.id ?? null,
    name: resolveNullableString(source?.name) ?? 'Unknown source',
  }
}


export function mapApiArticleToDomain(apiArticle: ApiArticle, fallbackSeed: number): Article {
  const description = resolveNullableString(apiArticle.description)
  const content = cleanContent(apiArticle.content)
  const hasFullContent = (content?.length ?? 0) >= MIN_USABLE_CONTENT_LENGTH
  const readingTimeSource = content ?? description ?? apiArticle.title ?? ''

  return {
    id: hashString(apiArticle.url || `${apiArticle.title}-${fallbackSeed}`),
    title: resolveNullableString(apiArticle.title) ?? 'Untitled article',
    description,
    content: hasFullContent ? content : null,
    author: resolveNullableString(apiArticle.author),
    source: resolveSource(apiArticle.source),
    url: apiArticle.url,
    imageUrl: resolveImageUrl(apiArticle.urlToImage),
    publishedAt: apiArticle.publishedAt,
    publishedAtLabel: formatPublishedDate(apiArticle.publishedAt),
    readingTimeMinutes: estimateReadingTime(readingTimeSource),
    hasFullContent,
  }
}
