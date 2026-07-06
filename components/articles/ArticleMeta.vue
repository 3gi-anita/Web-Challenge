<script setup lang="ts">
import type { Article } from '~/models/domain/article'

interface Props {
  article: Article
  showAuthor?: boolean
}

withDefaults(defineProps<Props>(), { showAuthor: false })
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted">
    <span class="font-medium text-ink-soft">{{ article.source.name }}</span>
    <span aria-hidden="true">·</span>
    <time :datetime="article.publishedAt">{{ article.publishedAtLabel }}</time>
    <span aria-hidden="true">·</span>
    <span>{{ article.readingTimeMinutes }} min read</span>
    <template v-if="showAuthor && article.author">
      <span aria-hidden="true">·</span>
      <span>By {{ article.author }}</span>
    </template>
  </div>
</template>
