<script setup lang="ts">
interface Props {
  count?: number
}

withDefaults(defineProps<Props>(), { count: 6 })
</script>

<template>
  <div
    class="flex flex-col gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3"
    role="status"
    aria-label="Loading articles"
  >
    <ArticleCardSkeleton v-for="n in count" :key="n" />
  </div>
</template>
