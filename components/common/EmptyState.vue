<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-white/60 px-6 py-16 text-center"
  >
    <div class="text-ink-soft">
      <slot name="icon">
        <svg
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 13h6m-6 4h6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </slot>
    </div>
    <div class="space-y-1.5">
      <h3 class="font-serif text-lg font-semibold text-ink">{{ title }}</h3>
      <p v-if="description" class="mx-auto max-w-sm text-sm text-muted">{{ description }}</p>
    </div>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>
