<script setup lang="ts">
import { useArticles } from '~/composables/useArticles'
import { formatRelativeTime } from '~/utils/formatters'

const route = useRoute()
const { isLoading, isError, errorMessage, errorKind, retry, getArticleById } = useArticles()

const articleId = computed<string>(() => {
  const raw = route.params.id
  return Array.isArray(raw) ? (raw[0] ?? '') : raw
})

const article = computed(() => getArticleById(articleId.value))
const showHero = computed(() => !isLoading.value && !isError.value && !!article.value)

const isSaved = ref(false)

const relativeTime = computed(() => (article.value ? formatRelativeTime(article.value.publishedAt) : ''))

const continueReadingLabel = computed(() => {
  if (!article.value) return ''
  return article.value.hasFullContent
    ? `This is an excerpt. Continue reading on ${article.value.source.name}.`
    : `The full article isn't available in this feed. Read it on ${article.value.source.name}.`
})

useSeoMeta({
  title: () => (article.value ? `${article.value.title} — Wire` : 'Article — Wire'),
  description: () => article.value?.description ?? 'Read the full article on Wire.',
})
</script>

<template>
  <div>
    <div v-if="showHero && article" class="bg-navy pb-6">
      <PageContainer class="pt-5 sm:pt-6">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            aria-label="Back to all articles"
            class="text-white transition-colors hover:text-white/70"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </NuxtLink>

          <span class="font-serif text-base font-semibold text-white">Article</span>

          <button
            type="button"
            class="flex items-center gap-0.5 text-white transition-colors hover:text-white/70"
            :aria-pressed="isSaved"
            aria-label="Save article"
            @click="isSaved = !isSaved"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              :fill="isSaved ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M12.1 8.64c-1.02-2.54-4.5-2.9-6.1-.98-1.4 1.67-1.24 4.07.4 5.7L12 19l5.6-5.64c1.64-1.63 1.8-4.03.4-5.7-1.6-1.92-5.08-1.56-6.1.98z"
              />
            </svg>
            <span class="text-lg font-medium leading-none">+</span>
          </button>
        </div>

        <h1 class="mb-3 mt-6 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">
          {{ article.title }}
        </h1>

        <div class="flex items-center gap-1.5 text-xs text-white/60">
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <span>{{ relativeTime }}</span>
        </div>
      </PageContainer>

      <ArticleImage :src="article.imageUrl" :alt="article.title" priority aspect-class="aspect-[2.5/1]" class="mt-5" />
    </div>

    <NuxtLink
      v-else
      to="/"
      class="mx-auto mt-8 flex max-w-content items-center gap-1.5 px-4 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-signal sm:px-6 lg:px-8"
    >
      <span aria-hidden="true">←</span> Back to all articles
    </NuxtLink>

    <PageContainer class="py-8 sm:py-10">
      <div v-if="isLoading" class="mx-auto max-w-2xl space-y-4">
        <SkeletonLine width="w-1/3" height="h-3" />
        <SkeletonLine width="w-full" height="h-9" />
        <SkeletonLine width="w-full" height="aspect-[16/9]" rounded="rounded-2xl" />
        <SkeletonLine v-for="n in 4" :key="n" width="w-full" height="h-4" />
      </div>

      <ErrorState v-else-if="isError" :message="errorMessage ?? 'Something went wrong while loading this article.'" :kind="errorKind" @retry="retry" />

      <EmptyState
        v-else-if="!article"
        title="Article not found"
        description="This link may be broken, or the article is no longer in the feed."
      >
        <template #action>
          <BaseButton variant="secondary" size="sm" @click="navigateTo('/')">Browse all articles</BaseButton>
        </template>
      </EmptyState>

      <article v-else class="mx-auto max-w-2xl">
        <p v-if="article.description" class="prose-article mb-2 text-lg font-medium italic text-ink-soft">
          “{{ article.description }}”
        </p>

        <div v-if="article.content" class="prose-article">
          <p>{{ article.content }}</p>
        </div>

        <div class="mt-8 rounded-xl border border-line bg-white p-5">
          <p class="mb-3 text-sm text-ink-soft">{{ continueReadingLabel }}</p>
          <a
            :href="article.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 font-medium text-signal hover:text-signal-hover"
          >
            Read full article ↗
          </a>
        </div>
      </article>
    </PageContainer>
  </div>
</template>
