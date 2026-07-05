# Bundle Builder

A multi-step security-system bundle builder with a live review panel. Built as a React + TypeScript prototype for a frontend take-home.

## Prerequisites

- Node.js 18+
- npm

## Quick start (from a clean clone)

```bash
git clone <repo-url>
cd bundle_builder
npm install
```

Start the mock API and the dev server in **two terminals**:

```bash
# Terminal 1 — mock API (port 3001)
npm run server
```

```bash
# Terminal 2 — frontend (port 5173)
npm run dev
```

Open `http://localhost:5173`. The app reads products, bundle state, and summary from `db.json` via json-server — **the API must be running** or the UI will fail to load data.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` type-checks and outputs static assets to `dist/`. Preview serves the built app locally (the mock API is still required if you want live data).

## Project structure

```
src/
├── components/builder/   # Accordion steps, product cards, variants, steppers
├── components/review/    # Summary panel, totals, checkout/save actions
├── components/layout/    # Two-column layout
├── hooks/                # React Query hooks (products, bundle)
├── lib/                  # API client, review helpers
└── types/                # Shared TypeScript types
db.json                   # Product catalog, initial bundle, summary groups
```

## Decisions & tradeoffs

**json-server instead of a static JSON import or localStorage alone.** The take-home allows a local JSON file; serving it through a small API felt like the right fit for this kind of task. It keeps the UI data-driven the way a production app would consume a backend, makes bundle mutations (`GET`/`PUT /bundle`) straightforward, and matches the spec’s optional “small backend” bonus without extra infrastructure. The tradeoff is two terminals during development.

**React Query for server state.** Products and bundle state come from the API. Mutations update the query cache directly so the builder and review panel stay in sync without refetch flicker.

**Derived totals.** Subtotal, savings, and monthly estimate are computed from line items rather than stored separately, which avoids sync bugs when quantities change.

**Per-variant quantities.** Each color variant is a separate bundle line. The card stepper edits the active variant only; the review panel lists every variant with quantity > 0.

**“Save my system for later”.** Saves a snapshot to `POST /submissions` (an archive in `db.json`) and shows a toast. Day-to-day bundle state is persisted through `PUT /bundle` on every change, so reload restores the current configuration while json-server is running.

**Checkout.** Placeholder button only — no navigation, as the prototype focuses on the builder and review panel.

**Not finished / known gaps.** Pixel-perfect Figma parity was not verified line-by-line. Chip selected-state styling follows a simple custom approach rather than a full design-token pass.
