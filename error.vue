<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()

const isNotFound = computed(() => props.error.statusCode === 404)

function handleBackHome(): void {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
    <p class="mb-3 font-mono text-xs uppercase tracking-widest text-signal">{{ error.statusCode }}</p>
    <h1 class="mb-3 font-serif text-3xl font-bold text-ink">
      {{ isNotFound ? 'Page not found' : 'Something went wrong' }}
    </h1>
    <p class="mb-8 max-w-sm text-sm text-muted">
      {{
        isNotFound
          ? "The page you're looking for doesn't exist or may have moved."
          : 'We hit an unexpected error. You can head back and try again.'
      }}
    </p>
    <BaseButton @click="handleBackHome">Back to Wire</BaseButton>
  </div>
</template>
