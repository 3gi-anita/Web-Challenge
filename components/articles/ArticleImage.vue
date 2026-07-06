<script setup lang="ts">
interface Props {
  src: string | null
  alt: string
  priority?: boolean
  aspectClass?: string
}

const props = withDefaults(defineProps<Props>(), { priority: false, aspectClass: 'aspect-[16/10]' })

const hasErrored = ref(false)
const showFallback = computed(() => !props.src || hasErrored.value)

function onError(): void {
  hasErrored.value = true
}
</script>

<template>
  <div class="relative w-full overflow-hidden bg-white/5" :class="aspectClass">
    <img
      v-if="!showFallback"
      :src="src ?? undefined"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      class="h-full w-full object-cover"
      @error="onError"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-white/[0.08]"
      aria-hidden="true"
    >
      <svg class="h-8 w-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 8.688a1.5 1.5 0 011.5-1.5h15a1.5 1.5 0 011.5 1.5v10.125a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V8.688zM12 9.75a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
        />
      </svg>
    </div>
  </div>
</template>
