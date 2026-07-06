<script setup lang="ts">
import type { AppErrorKind } from '~/types/common'

interface Props {
  message: string
  kind?: AppErrorKind
}

const props = withDefaults(defineProps<Props>(), { kind: 'unknown' })

const emit = defineEmits<{
  retry: []
}>()

const title = computed(() => (props.kind === 'offline' ? "You're offline" : 'Something went wrong'))
</script>

<template>
  <div
    role="alert"
    class="flex min-h-[55vh] flex-col items-center justify-center gap-4 rounded-3xl bg-fog px-6 py-16 text-center"
  >
    <div class="text-ink-soft/60">
      <svg
        v-if="kind === 'offline'"
        class="h-14 w-14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M8.5 16.5a5 5 0 0 1 7 0" />
        <path d="M5 12.8a10 10 0 0 1 4-2.6" />
        <path d="M15 10.2a10 10 0 0 1 4 2.6" />
        <path d="M2 8.8a15 15 0 0 1 5-3" />
        <path d="M17 5.8a15 15 0 0 1 5 3" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
      <svg
        v-else
        class="h-14 w-14"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    </div>
    <div class="space-y-1.5">
      <h3 class="font-serif text-lg font-semibold text-ink">{{ title }}</h3>
      <p class="mx-auto max-w-sm text-sm text-ink-soft/80">{{ message }}</p>
    </div>
    <BaseButton variant="inverse" size="sm" @click="emit('retry')">
      <svg
        class="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
      Retry
    </BaseButton>
  </div>
</template>
