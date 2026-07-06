import type { Article } from '~/models/domain/article'
import { mapApiArticleToDomain } from '~/utils/mappers'
import { normalizeApiError, useApi } from './useApi'
import { useArticlesStore } from '~/stores/articles'

export function useArticles() {
  const store = useArticlesStore()
  const { getArticles } = useApi()

  const { data, pending, error, refresh } = getArticles()

  const articles = computed<Article[]>(() =>
    (data.value?.articles ?? []).map((raw, index) => mapApiArticleToDomain(raw, index)),
  )

  const totalResults = computed(() => data.value?.totalResults ?? 0)
  const isLoading = computed(() => pending.value)
  const appError = computed(() => normalizeApiError(error.value))
  const isError = computed(() => appError.value !== null)
  const errorMessage = computed(() => appError.value?.message ?? null)
  const errorKind = computed(() => appError.value?.kind ?? 'unknown')

  watch(
    [articles, isLoading, appError],
    ([articleList, loading, currentError]) => {
      if (loading) {
        store.setLoading()
      } else if (currentError) {
        store.setError(currentError.message)
      } else {
        store.hydrate(articleList, totalResults.value)
      }
    },
    { immediate: true },
  )

  function getArticleById(id: string): Article | undefined {
    return articles.value.find((article) => article.id === id)
  }

  async function retry(): Promise<void> {
    await refresh()
  }

  return {
    articles,
    totalResults,
    isLoading,
    isError,
    errorMessage,
    errorKind,
    getArticleById,
    retry,
  }
}
