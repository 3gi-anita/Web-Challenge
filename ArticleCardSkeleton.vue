<script setup lang="ts"></script>

<template>
  <div class="flex flex-col overflow-hidden rounded-3xl bg-navy" aria-hidden="true">
    <div class="lg:px-5 lg:pt-5">
      <div class="aspect-[16/10] w-full animate-pulse bg-white/10 lg:rounded-2xl" />
    </div>
    <div class="flex flex-col gap-4 p-5">
      <SkeletonLine tone="dark" width="w-5/6" height="h-5" />
      <SkeletonLine tone="dark" width="w-1/2" height="h-5" />
      <div class="mt-1 flex items-center justify-between">
        <SkeletonLine tone="dark" width="w-20" height="h-4" />
        <SkeletonLine tone="dark" width="w-24" height="h-7" rounded="rounded-full" />
      </div>
    </div>
  </div>
</template>