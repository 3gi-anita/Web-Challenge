export interface ArticleSource {
  id: string | null
  name: string
}

export interface Article {
  id: string
  title: string
  description: string | null
  content: string | null
  author: string | null
  source: ArticleSource
  url: string
  imageUrl: string | null
  publishedAt: string
  publishedAtLabel: string
  readingTimeMinutes: number
  hasFullContent: boolean
}
