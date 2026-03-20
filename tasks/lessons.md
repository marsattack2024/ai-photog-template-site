# Lessons Learned

Rules discovered through real bugs and corrections. Read before planning.

1. **Route paths resolve relative to appDirectory** — When `appDirectory` is set in react-router.config.ts, all route component paths in routes.ts resolve relative to that directory, not the project root. Using `src/app/pages/Home.tsx` when appDirectory is `src/app` doubles the path to `src/app/src/app/pages/Home.tsx`. Use `./pages/Home.tsx` instead.

2. **macOS case-insensitive FS breaks co-located files** — On macOS, `Root.tsx` and `root.tsx` in the same directory collide because the filesystem is case-insensitive. When framework mode needs `root.tsx` alongside an existing `Root.tsx`, rename the existing file first.

3. **SSR is now enabled — prerendering + server functions coexist** — `ssr: false` was removed from `react-router.config.ts` on 2026-03-19. Prerendering still works identically (controlled by the `prerender` array). SSR adds a `build/server/` bundle that deploys as Vercel serverless functions, enabling React Router `action` exports for API routes. The old lesson ("ssr:false allows loader on prerendered routes") still applies — `loader()` runs at build time for prerendered routes to feed `meta()`. Now `action` exports also work for server-side POST handlers.

4. **Build command is react-router build, not vite build** — `vite build` only does the client bundle. `react-router build` does client + server + prerendering. Always use `react-router build` in package.json scripts.

5. **Framework mode needs index.html deleted** — The old `index.html` with `<div id="root">` conflicts with framework mode which generates HTML from `root.tsx`. Delete it or the build fails with "Failed to resolve /src/main.tsx from index.html."

6. **Verify external claims before accepting** — When the user or another AI provides technical corrections, verify each claim independently against official docs. In this session, 2 of 9 claims were wrong (buildEnd "doesn't exist" — it does; @vercel/react-router version was 1.2.6 not 1.2.3).

7. **Pin react-router versions exactly** — React Router v7 has had 6+ CVEs including CVSS 9.1 path traversal. Use exact versions (no `^`) and update intentionally.

8. **process.env.VITE\_\* doesn't work in Node config files** — `react-router.config.ts` runs in Node at build time. Vite only exposes `VITE_*` vars via `import.meta.env` in client bundles, not `process.env`. Use separate non-prefixed env vars (`SUPABASE_URL`) for build-time config.

9. **Pre-existing TS errors surface when adding tsconfig.json** — A project without tsconfig.json may have latent type errors. When adding TypeScript config to a Figma Make project, expect and fix pre-existing issues (missing imports, implicit any types, broken files in import directories).

10. **Audit agents hallucinate file contents** — When a subagent reports "this file has no h1" or "this page is missing X," verify by reading the actual file before planning fixes. In this session, 5 of 7 audit findings were wrong (pages already had correct h1 tags). Always re-read the file yourself before editing.

11. **`as const satisfies` and optional fields need ReadonlyArray** — When adding optional array fields to a type used with `as const satisfies Record<...>`, use `ReadonlyArray<{ readonly key: type }>` instead of `type[]`. The `as const` freezes values as deeply readonly, which won't assign to mutable array types.

12. **Type intersection for shared optional fields** — When multiple union members need the same optional fields (e.g., SEO overrides on VideoPost/ArticlePost/CaseStudyPost), define a shared type and use intersection (`PostSeoFields & { ... }`) instead of duplicating fields across each type.

13. **Supabase needs 4 env vars, not 2** — This project requires both `VITE_*` prefixed vars (for the browser bundle via `import.meta.env`) AND non-prefixed vars (for Node build-time prerendering via `process.env`). Missing either pair causes silent failures: no blog data in browser, or no blog routes prerendered.

14. **Blog video posts need structured data, not just content** — Video posts render from `intro`, `outro`, `post_insights`, `post_transcripts` — NOT the raw `content` HTML field. Importing a WordPress post's body into `content` without parsing into these structured tables produces an empty-looking page.

15. **YouTube transcripts use Python, not npm** — The `youtube-transcript-api` v1.2.4 package is installed via pip3 (Python), NOT as an npm package. Use `python3 -c "from youtube_transcript_api import YouTubeTranscriptApi; ..."` to fetch transcripts. Do NOT search for npm packages or try `npx` — the tool is Python-only. Raw YouTube captions are fragmented (one line per 2 seconds) — always summarize into coherent 2-5 minute chunks before inserting into `post_transcripts`.

16. **Posts table `id` has no auto-increment** — The `posts.id` column is `bigint` with no default/sequence. Before inserting a new post, always run `SELECT MAX(id) FROM posts` and use `MAX + 1`. Omitting the `id` field causes a NOT NULL constraint violation.

17. **Blog post date controls listing order** — The blog listing page (`/blog`) sorts by `date DESC`. Setting a historical date (e.g. the original video upload date) buries the post below 70+ newer entries and makes it invisible on the listing. Always use today's date for new posts unless the user explicitly wants a historical date. This was discovered when a post was "published" but didn't appear on the blog.

18. **Blog data has two layers — listing is live, post pages are baked** — The blog listing (`/blog`) fetches from Supabase at runtime (client-side) — changes appear instantly. Individual post pages (`/blog/<slug>`) are prerendered at build time — a Vercel deploy is required for new post URLs to exist, for deleted posts to stop resolving, and for content edits to appear on direct-link visits. After publishing or deleting a post, always deploy.

19. **Always choose the future-proof, production-grade option — no band-aids** — When there are multiple ways to solve a problem (e.g., quick workaround vs. proper framework integration), ALWAYS choose the architecturally correct path, even if it's harder. No patchwork, no "it works for now" shortcuts, no splitting the stack to avoid a harder migration. Every decision should be the one you'd make if this system had to run for 5 years without a rewrite. Specific examples: (a) Use React Router v7 server actions for API routes — don't create a separate Vercel `/api` directory alongside the framework. (b) Enable SSR properly instead of working around `ssr: false` with client-side hacks. (c) Use the framework's built-in patterns before reaching for external services. Band-aids compound — one creates two, two create five, and eventually the codebase is more workaround than product.

20. **`ssr: false` prevents server-side code from deploying on Vercel** — With `ssr: false` in `react-router.config.ts`, the `@vercel/react-router` adapter sets `serverBundles: undefined`, which means NO server functions are deployed — only static files. React Router `action` and server-only `loader` exports become dead code. To use API routes (actions), SSR must be enabled. Prerendering and SSR are NOT mutually exclusive in React Router v7 — you can have both. The `prerender` config still generates static HTML for specified routes while server functions handle dynamic requests.

21. **Vite dev can split React into duplicate instances** — If `useContext` returns null with a stack trace showing two different chunk files, Vite's dev prebundler created separate React copies. Fix with `resolve: { dedupe: ["react", "react-dom", "react-router"] }` and `optimizeDeps: { include: [...] }` in vite.config.ts, then clear `node_modules/.vite`. These settings are dev-only — production builds (Rollup) already deduplicate.
