<template>
  <header class="sticky top-0 z-10 bg-surface">
    <PageContainer>
      <div class="flex h-16 items-center justify-between sm:h-20">
        <NuxtLink to="/" class="font-serif text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
          Articles
        </NuxtLink>

        <div class="flex items-center gap-5 text-ink">
          <button type="button" aria-label="View options" class="transition-colors hover:text-signal">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="8" height="8" rx="2" />
              <rect x="13" y="3" width="8" height="8" rx="2" />
              <rect x="3" y="13" width="8" height="8" rx="2" />
              <rect x="13" y="13" width="8" height="8" rx="2" />
            </svg>
          </button>
          <button type="button" aria-label="Search articles" class="transition-colors hover:text-signal">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </div>
    </PageContainer>
  </header>
</template>
