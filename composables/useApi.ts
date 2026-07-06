import type { FetchError } from 'ofetch'
import type { ApiArticlesResponse } from '~/models/api/article.api'
import type { AppError } from '~/types/common'


export function useApi() {
  const config = useRuntimeConfig()

  function getArticles() {
    return useFetch<ApiArticlesResponse>(() => config.public.apiBaseUrl, {
      key: 'articles-response',
      retry: 1,
      timeout: 10_000,
    })
  }

  return { getArticles }
}

/**
 * Normalizes whatever `useFetch`'s `error` ref contains into a single,
 * UI-friendly shape. Kept outside `useApi` since it's a pure function, not a
 * composable — no reactivity or Nuxt context needed.
 */
export function normalizeApiError(
  error: FetchError | Error | null | undefined,
): AppError | null {
  if (!error) return null

  const statusCode = 'statusCode' in error ? (error.statusCode as number | undefined) : undefined

  if (statusCode === 404) {
    return { message: 'The articles feed could not be found.', statusCode, kind: 'not-found' }
  }
  if (typeof statusCode === 'number' && statusCode >= 500) {
    return {
      message: 'The articles service is temporarily unavailable. Please try again shortly.',
      statusCode,
      kind: 'server',
    }
  }
  if (error.name === 'FetchError' && statusCode === undefined) {
    return { message: 'Please connect to the internet and try again.', kind: 'offline' }
  }

  return { message: 'Something went wrong while loading articles.', statusCode, kind: 'unknown' }
}
