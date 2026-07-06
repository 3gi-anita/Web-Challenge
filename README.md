# Wire — Article Explorer

A server-side rendered Nuxt 3 app that fetches articles from a mock API and presents them in a resilient, readable feed with a full detail view — built for the Web Developer Challenge.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Nuxt **3.21.8** (pinned deliberately — see note below) |
| Language | TypeScript, `strict: true`, `any` banned by both the compiler and ESLint |
| Component style | Composition API, `<script setup>` everywhere |
| Rendering | SSR (`ssr: true`) |
| State | Pinia (setup-style stores, for consistency with the rest of the Composition API codebase) |
| Data fetching | Nuxt's native `useFetch` (no axios, no manual `fetch`) |
| Styling | Tailwind CSS |
| Testing | Vitest, for the pure utility/mapping layer |
| Linting | ESLint (flat config) + `typescript-eslint` + `eslint-plugin-vue` |

**Why Nuxt 3.21.8 specifically:** the `nuxt` package on npm now resolves to Nuxt **4** by default. The brief asks for Nuxt 3, so this project pins the latest Nuxt **3.x** release rather than the latest overall release. Pinia, `@pinia/nuxt`, and Tailwind are similarly pinned to versions verified to be peer-compatible with each other (see `package.json` — e.g. `@pinia/nuxt@0.9.x` targets Pinia 2.x, whereas the newest `@pinia/nuxt` requires Pinia 3).

## Getting started

```bash
npm install
npm run dev
```

Then open **http://localhost:3000**. The API base URL already defaults to the one provided in the brief, so no `.env` file is required to run it. To point at a different endpoint (e.g. for local testing), copy `.env.example` to `.env` and change `NUXT_PUBLIC_API_BASE_URL` — this is a runtime-config value, so it can also be overridden at deploy time without rebuilding.

Other scripts:

```bash
npm run build      # production build
npm run preview    # run the production build locally
npm run typecheck  # vue-tsc, strict, project-wide
npm run lint       # eslint .
npm run test       # vitest run
```

## Project structure

```
components/
  ui/          Pure, app-agnostic primitives — BaseButton, BaseBadge, BaseSpinner, SkeletonLine
  common/      Reusable but app-aware — EmptyState, ErrorState, PageContainer, AppHeader, AppFooter
  articles/    Feature-specific — ArticleCard, ArticleGrid(+Skeleton), ArticleImage, ArticleMeta
composables/
  useApi.ts       the ONLY place useFetch is called — base URL, retry/timeout, error normalization
  useArticles.ts  feature composable: fetch → map → expose typed, SSR-safe reactive state
models/
  api/         raw API response shapes (ApiArticle, ApiArticlesResponse) — a faithful mirror of the wire format, warts included
  domain/      the UI-facing Article type — always fully resolved, never `undefined`
pages/
  index.vue              article feed
  articles/[id].vue       article detail
stores/
  articles.ts  Pinia store — shared article state (see "API & composables strategy" below)
utils/
  hash.ts        pure FNV-1a hash → stable article ids
  formatters.ts  date/reading-time/truncation helpers
  mappers.ts     the api → domain translation layer (the core resilience logic)
types/
  common.ts    RequestStatus enum, AppError shape
tests/         Vitest specs for hash/formatters/mappers
layouts/default.vue, app.vue, error.vue
```

**Justified extensions beyond the required layout:** `components/articles/` (domain-specific components don't belong under the "app-agnostic" `common/` or "pure UI" `ui/` folders as defined in the brief); `tests/` for Vitest specs; `error.vue` as a top-level Nuxt error boundary.

## API & composables strategy

All API access is centralized in **`useApi.ts`** — it's the only file that calls `useFetch`, with a fixed `key` shared by every caller. Because Nuxt de-duplicates `useFetch`/`useAsyncData` calls by key, navigating from the list page to a detail page (or loading the detail page directly) never triggers a second network request — the payload is reused. `useApi` also owns retry/timeout config and normalizes whatever `useFetch`'s `error` ref contains into one `AppError` shape.

**`useArticles.ts`** is the feature composable pages actually use. Its `articles` value is a `computed` derived directly from `useFetch`'s own `data` ref — this is deliberate: Nuxt guarantees `data` is populated before SSR finishes rendering, so page correctness never depends on watcher timing. A `watch` on that same computed mirrors the resolved list into the **Pinia store** as a secondary, cross-cutting cache — so any future component (a header count, a "recently viewed" list) can read shared article state without re-running the fetch pipeline, without becoming the thing the current pages' correctness depends on. This also fits the brief's "avoid unnecessary global state" note: page-local concerns like the grid's pagination `visibleCount` deliberately stay as local `ref`s inside `ArticleGrid.vue`, not in the store.

The mock API has no single-article endpoint, so the detail page fetches the same full list (deduplicated, per above) and looks up the article by id client/server-side.

## Typing & modeling decisions

I fetched the live endpoint directly during development rather than guessing its shape, and it's genuinely inconsistent — this is clearly intentional on the challenge's part. `models/api/article.api.ts` mirrors that wire format exactly, including the mess: `author` and `description` are sometimes absent keys entirely (not just `null`), `urlToImage` shows up as a real URL, `null`, or `""`, and `content` is truncated by the upstream provider.

`utils/mappers.ts` is the single place that resolves all of that into `models/domain/article.ts` — a type where nothing is ever `undefined`. Components consume the domain model only and never need to defend against missing fields themselves.

Articles have no id in the API (NewsAPI-style feeds identify by URL). `utils/hash.ts` derives a short, stable id via FNV-1a hashing of the URL, rather than array index — so ids stay valid even if the feed's ordering ever changes between requests.

## Error-handling approach

Three layers, so a failure anywhere degrades gracefully instead of breaking the app:

1. **Network/data layer** — `normalizeApiError` in `useApi.ts` maps any `useFetch` error (timeout, 4xx, 5xx, unreachable host) to one friendly `AppError` message.
2. **Page/UI layer** — every page branches on `isLoading` → `ArticleGridSkeleton` / `SkeletonLine`s, `isError` → `ErrorState` with a **Try again** button wired to `useFetch`'s `refresh()`, empty results → `EmptyState`, and (on the detail page) a not-found id → its own `EmptyState` with a way back home.
3. **App layer** — `error.vue` catches anything unhandled (a genuine 404 route, an unexpected exception) so the user always sees Wire's own error screen, never a stack trace.

Missing/partial data is handled at the mapping layer (see above) rather than scattered across components: a missing image falls back to a fixed-aspect placeholder (no layout shift, `onerror`-safe for broken URLs too), a missing author/description simply isn't rendered, and truncated `content` is cleaned and paired with a "continue reading at the source" link rather than presented as if it were the complete article.

## Design notes — about the Figma file

https://www.figma.com/design/O5PRl1FsvKXLfHVPELGZ6d/Development-Challenge?node-id=0-1&p=f&t=uth1jdbG29n2TUj3-0

## Assumptions made

- No article-id or single-article endpoint exists, so ids are derived (hashed from URL) rather than provided.
- `content` from this API is always a snippet, even after cleanup (NewsAPI-style feeds never send full body text) — so the detail page presents it honestly as an excerpt with a link to the original, rather than implying it's the complete article.
- The truncation marker in this mock's `content` is followed by Lorem-Ipsum filler rather than a clean `"[+N chars]"` close — the cleanup strips from the marker onward regardless of what follows, so it's resilient to either form.
- `totalResults` (5846 in the live payload) reflects the source's total corpus, not how many articles this endpoint actually returns — so I avoided building "showing X of totalResults" messaging that would misrepresent what's actually loaded.
- Empty string and clearly-malformed values for `urlToImage` are treated the same as missing, not as "a value that happens to render broken."

