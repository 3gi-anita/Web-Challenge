<script setup lang="ts">
import type { Article } from '~/models/domain/article'

interface Props {
  article: Article
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/articles/${article.id}`"
    class="group flex flex-col overflow-hidden rounded-3xl bg-navy shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cardHover"
  >
    <ArticleImage :src="article.imageUrl" :alt="article.title" />

    <div class="flex flex-col gap-4 p-5">
      <h3 class="line-clamp-2 font-serif text-lg font-semibold leading-snug text-white">
        {{ article.title }}
      </h3>

      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-1.5 text-xs text-white/55">
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
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <line x1="16" y1="3" x2="16" y2="7" />
            <line x1="8" y1="3" x2="8" y2="7" />
            <line x1="3" y1="9" x2="21" y2="9" />
          </svg>
          <span>{{ article.publishedAtLabel }}</span>
        </div>

        <span
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-signal py-1.5 pl-4 pr-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-signal-hover"
        >
          Read More
          <span class="flex h-6 w-6 items-center justify-center rounded-full bg-white/15" aria-hidden="true">
            <svg
              class="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
