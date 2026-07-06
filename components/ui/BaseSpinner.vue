<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), { size: 'md' })

const SIZE_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-9 w-9',
}
</script>

<template>
  <svg
    class="animate-spin text-current"
    :class="SIZE_CLASSES[size]"
    viewBox="0 0 24 24"
    fill="none"
    role="status"
    aria-label="Loading"
  >
    <circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
    <path
      class="opacity-90"
      d="M22 12a10 10 0 0 0-10-10"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>
