import { defineStore } from 'pinia'
import type { Article } from '~/models/domain/article'
import { RequestStatus } from '~/types/common'

export const useArticlesStore = defineStore('articles', () => {
  const items = ref<Article[]>([])
  const totalResults = ref(0)
  const status = ref<RequestStatus>(RequestStatus.Idle)
  const errorMessage = ref<string | null>(null)

  const isLoading = computed(() => status.value === RequestStatus.Loading)
  const hasError = computed(() => status.value === RequestStatus.Error)
  const isEmpty = computed(
    () => status.value === RequestStatus.Success && items.value.length === 0,
  )

  function articleById(id: string): Article | undefined {
    return items.value.find((article) => article.id === id)
  }

  function setLoading(): void {
    if (status.value !== RequestStatus.Success) {
      status.value = RequestStatus.Loading
    }
  }

  function hydrate(articles: Article[], total: number): void {
    items.value = articles
    totalResults.value = total
    status.value = RequestStatus.Success
    errorMessage.value = null
  }

  function setError(message: string): void {
    status.value = RequestStatus.Error
    errorMessage.value = message
  }

  return {
    items,
    totalResults,
    status,
    errorMessage,
    isLoading,
    hasError,
    isEmpty,
    articleById,
    setLoading,
    hydrate,
    setError,
  }
})
