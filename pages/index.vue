<script setup lang="ts">
import { useArticles } from '~/composables/useArticles';

useSeoMeta({
  title: 'Wire — Articles worth reading',
  description: 'A fast, resilient reader for articles gathered from across the web.',
})

const { articles, isLoading, isError, errorMessage, errorKind, retry } = useArticles()
</script>

<template>
  <PageContainer class="py-10 sm:py-14">
    <div class="mb-8 max-w-2xl sm:mb-12">
      <p class="mb-3 font-mono text-xs uppercase tracking-widest text-signal">Today's feed</p>
      <h1 class="font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
        Articles worth reading, gathered in one place.
      </h1>
    </div>

    <ArticleGridSkeleton v-if="isLoading" />

    <ErrorState
      v-else-if="isError"
      :message="errorMessage ?? 'Something went wrong while loading articles.'"
      :kind="errorKind"
      @retry="retry"
    />

    <EmptyState
      v-else-if="articles.length === 0"
      title="No articles right now"
      description="The feed came back empty. Check back again soon."
    />

    <ArticleGrid v-else :articles="articles" />
  </PageContainer>
</template>
