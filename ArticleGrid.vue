<script setup lang="ts">
import type { Article } from '~/models/domain/article'

interface Props {
  articles: Article[]
}

const props = defineProps<Props>()

const PAGE_SIZE = 9
const visibleCount = ref(PAGE_SIZE)

const visibleArticles = computed(() => props.articles.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < props.articles.length)

function loadMore(): void {
  visibleCount.value += PAGE_SIZE
}
</script>

<template>
  <div>
    
    <div class="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in visibleArticles" :key="article.id" :article="article" />
    </div>
    <p class="mt-6 text-center font-mono text-xs uppercase tracking-wider text-muted">
      Showing {{ visibleArticles.length }} of {{ articles.length }} articles
    </p>
    <div v-if="hasMore" class="mt-4 flex justify-center">
      <BaseButton variant="secondary" @click="loadMore">Load more articles</BaseButton>
    </div>
  </div>
</template>
