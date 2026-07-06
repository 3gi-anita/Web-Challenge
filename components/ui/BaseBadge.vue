<script setup lang="ts">
interface Props {
  tone?: 'neutral' | 'signal'
}

withDefaults(defineProps<Props>(), { tone: 'neutral' })
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-wider"
    :class="tone === 'signal' ? 'bg-signal-soft text-signal' : 'bg-line/60 text-ink-soft'"
  >
    <slot />
  </span>
</template>
