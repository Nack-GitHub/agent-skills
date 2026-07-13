---
name: nextjs-react-expert
description: React and Next.js performance optimization from Vercel Engineering. Use when building React components, optimizing performance, eliminating waterfalls, reducing bundle size, reviewing code for performance issues, or implementing server/client-side optimizations. DO NOT USE FOR generic CSS styling or backend node services.
---

# Next.js & React Performance Expert

> **Vercel Engineering Standards:** 58 optimization rules prioritized by performance impact, featuring Next.js 16 Cache Components.
> **Philosophy:** Eliminate waterfalls first, optimize bundle delivery second, then micro-optimize.

## Overview

Modern React and Next.js applications face complex performance challenges across the network, server, and client bounds. This skill guides the agent to design and implement highly optimized React and Next.js applications, following authoritative standards set by Vercel. It prioritizes eliminating rendering/fetching waterfalls, optimizing client bundle sizes, leveraging server-side streaming/PPR, and utilizing next-gen React Server Component caching mechanisms to ensure sub-second Time to Interactive (TTI) and Largest Contentful Paint (LCP).

## When to Use

- When building React components, hooks, or pages in a Next.js (App or Pages router) codebase
- When debugging slow page loading speeds, high LCP/INP scores, or rendering lag
- When reviewing data fetching patterns to eliminate query waterfalls
- When optimizing chunk splitting, dynamic imports, or resolving bundle size bloat
- When configuring Next.js 16+ Server Actions, Server Components, or caching features (`use cache`, `cacheLife`)

**When NOT to Use:**

- For static web pages or projects using other frameworks like Vue/Angular (use `frontend-ui-engineering` instead)
- For database design or API routing outside of Next.js routes (use `database-design` or `api-and-interface-design`)
- For general CSS design/styling tasks unless it impacts LCP/CLS (use `frontend-ui-engineering` or `tailwind-patterns`)

## Process

### Phase 1: Performance Triage & Impact Mapping
Before optimizing, check the symptom using this mapping:
- **Sequential API fetches / slow load:** Read [1-async-eliminating-waterfalls.md](references/1-async-eliminating-waterfalls.md) and [3-server-server-side-performance.md](references/3-server-server-side-performance.md).
- **Bundle size > 200KB / slow TTI:** Read [2-bundle-bundle-size-optimization.md](references/2-bundle-bundle-size-optimization.md).
- **Client-side state latency:** Read [4-client-client-side-data-fetching.md](references/4-client-client-side-data-fetching.md).
- **Excessive re-renders / laggy inputs:** Read [5-rerender-re-render-optimization.md](references/5-rerender-re-render-optimization.md).
- **Large lists / image rendering bottlenecks:** Read [6-rendering-rendering-performance.md](references/6-rendering-rendering-performance.md).

### Phase 2: Eliminating Fetching Waterfalls (Priority 1)
- **Parallelize:** Always fetch independent queries in parallel using `Promise.all()` instead of sequential `await` calls.
- **Preload:** Load data as early as possible in the component lifecycle or layout.
- **RSC Fetching:** Perform data fetching in Server Components where possible to avoid round-trip network waterfalls.

### Phase 3: Bundle Size and Imports Optimization (Priority 2)
- **Dynamic Imports:** Use `dynamic()` for large libraries, off-screen components, or interactive dialogs/modals.
- **Avoid Barrel Imports:** Do not import from massive index files (`import { x } from '@/components'`) as it breaks tree-shaking. Import directly from individual file paths instead.
- **Analyze Bundles:** Regularly audit chunk dependencies to avoid duplicates.

### Phase 4: Server-Side and Next.js 16+ Caching
- **Streaming & Suspense:** Stream slow data fetching blocks using Suspense boundaries to render shells immediately.
- **Next.js 16+ Caching:** For Next.js 16 projects, use the native `use cache` directive and define `cacheLife` profiles to avoid outdated `revalidate` patterns. See [9-cache-components.md](references/9-cache-components.md).

### Phase 5: Verification & Audit
1. Run the React performance scanner to inspect code structures:
   ```bash
   python skills/nextjs-react-expert/scripts/react_performance_checker.py .
   ```
2. Verify Next.js builds compile successfully and review the generated route size report.
3. Validate client re-renders using React DevTools Profiler if debugging interactive latency.

---

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The client network is fast, sequence awaits won't hurt" | 3 sequential awaits on a mobile connection add full RTT latency (300-900ms+), dragging down LCP. Parallelize them. |
| "Tree-shaking will automatically remove unused imports" | Webpack and Turbopack cannot tree-shake barrel exports if any file has side effects. Direct imports are the only guarantee. |
| "I should memoize every single component using React.memo" | Memoization has overhead. Only memoize components that render frequently with identical props (e.g. lists, charts). |
| "Next.js pages router is good enough, App router is too complex" | App Router enables Server Components, eliminating client-side JS overhead. Start App-router native for new features. |
| "We will optimize performance before launching" | Performance is an architectural attribute. Retrofitting parallel fetching and dynamic imports on a completed app is twice as difficult. |

## Red Flags

- Independent, sequential `await` statements in components or server-side functions
- Importing from index files or directory roots (barrel exports) inside client/server code
- Importing heavy third-party libraries (e.g., Lodash, ChartJS) statically without `dynamic()`
- Using `useEffect` to fetch data on client mount without query deduplication or state management
- Placing state high in the React tree, causing the entire page to re-render on small interactions
- Lack of error boundaries and Suspense skeletons around network-reliant component blocks

## Verification

Before marking the task as complete, verify:

- [ ] All independent queries are requested concurrently (`Promise.all()`)
- [ ] No barrel imports in the modified or added modules
- [ ] Large UI blocks (modals, sliders) are dynamically loaded
- [ ] Client component state is localized to minimize unnecessary sub-tree re-renders
- [ ] Server components are utilized for static/data-heavy structures
- [ ] Next.js build runs successfully without bundle size warnings
- [ ] React Performance Checker script (`react_performance_checker.py`) executed and passed
- [ ] No sequential awaits detected in the added/modified modules
