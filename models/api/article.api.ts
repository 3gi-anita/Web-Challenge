export interface ApiArticleSource {
  id: string | null
  name: string
}

export interface ApiArticle {
  source: ApiArticleSource
  author?: string | null
  title: string
  description?: string | null
  url: string
  urlToImage?: string | null
  publishedAt: string
  content?: string | null
}

export interface ApiArticlesResponse {
  status: string
  totalResults: number
  articles: ApiArticle[]
}
