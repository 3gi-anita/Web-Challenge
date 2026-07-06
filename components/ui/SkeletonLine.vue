<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  rounded?: string
  /** 'dark' for use on navy card backgrounds, 'light' for use on the paper background. */
  tone?: 'light' | 'dark'
}

withDefaults(defineProps<Props>(), {
  width: 'w-full',
  height: 'h-4',
  rounded: 'rounded-md',
  tone: 'light',
})
</script>

<template>
  <div
    class="relative overflow-hidden"
    :class="[width, height, rounded, tone === 'dark' ? 'bg-white/10' : 'bg-line/70']"
    aria-hidden="true"
  >
    <div
      class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent to-transparent"
      :class="tone === 'dark' ? 'via-white/20' : 'via-white/60'"
    />
  </div>
</template>
