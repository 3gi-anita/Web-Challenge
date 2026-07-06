<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
})

const VARIANT_CLASSES: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-ink text-paper hover:bg-ink-soft',
  secondary: 'bg-transparent text-ink border border-line hover:border-ink hover:bg-white',
  ghost: 'bg-transparent text-signal hover:bg-signal-soft',
  inverse: 'bg-surface text-ink shadow-sm hover:bg-line/40',
}

const SIZE_CLASSES: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-[0.9375rem] px-4 py-2.5',
}

const classes = computed(() => [VARIANT_CLASSES[props.variant], SIZE_CLASSES[props.size]])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
    :class="classes"
  >
    <slot />
  </button>
</template>
