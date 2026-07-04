# Bundle Builder

An interactive product bundling application built with React and TypeScript. Users can select components, configure variants, and review their custom bundle before checkout.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for build tooling
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **shadcn/ui** (radix-nova style) with Radix UI primitives
- **TanStack React Query** for server state (bundle, products, summary)
- **json-server** as mock backend API
- **react-hot-toast** for user feedback

## Prerequisites

- Node.js 18+
- npm

## Installation

```bash
npm install
```

## Run (development)

Two terminals are required:

**Terminal 1 — json-server (mock API on port 3001):**

```bash
npm run server
```

**Terminal 2 — Vite dev server:**

```bash
npm run dev
```

Then open the URL shown in Terminal 2 (typically `http://localhost:5173`).

## Build (production)

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── components/
│   ├── builder/          # Product selection, variant chips, quantity stepper
│   ├── review/           # Order summary & review panel
│   ├── shared/           # EmptyState, ErrorState
│   ├── layout/           # BundleLayout, BuilderSection
│   └── ui/               # shadcn/ui Accordion component
├── hooks/
│   ├── useProducts.ts    # React Query hook for product catalog
│   └── useServerBundle.ts # React Query hook for bundle CRUD via API
├── lib/
│   ├── api.ts            # Fetch wrappers for json-server endpoints
│   └── utils.ts          # cn() utility
├── types/
│   └── index.ts          # TypeScript types
├── utils/
│   └── index.ts          # Image map, formatPrice
├── App.tsx
├── App.css               # Tailwind import + CSS theme variables
└── main.tsx
db.json                   # json-server database (products, bundle, summary, submissions)
```

## Tradeoffs

- **json-server over localStorage**: Bundle state persists on the server and survives page reloads. Requires two terminals during development.
- **React Query over manual state**: Server is the single source of truth for bundle contents; mutations update the query cache directly to avoid refetch flicker.
- **No Redux**: Theme is static (light mode only). All other state lives in React Query or local component state.
- **Derived state**: Totals, savings, and item counts are computed from the items array rather than stored separately, preventing sync bugs.
