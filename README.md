# Bundle Builder

An interactive product bundling application built with React and TypeScript. Users can select components, configure variants, and review their custom bundle before checkout.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for build tooling
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **shadcn/ui** (radix-nova style) with Radix UI primitives
- **Lucide React** for icons
- **localStorage** for client-side persistence

## Installation

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

## Build (production)

```bash
npm run build
npm run preview
```

## Folder Structure

```
src/
├── components/
│   ├── builder/          # Product selection & configuration
│   ├── review/           # Order summary & review panel
│   ├── shared/           # Reusable UI primitives
│   └── ui/               # shadcn/ui generated components
├── data/
│   └── products.json     # Product catalog data
├── hooks/
│   └── useBundle.ts      # Bundle state + persistence logic
├── lib/
│   └── utils.ts          # cn() utility
├── pages/
│   └── BundleBuilder.tsx # Main page orchestrator
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   └── index.ts          # Price calc, formatting, localStorage helpers
├── App.tsx
├── App.css               # Tailwind import + CSS theme variables
└── main.tsx
```

## Tradeoffs

- **Tailwind v4 + shadcn/ui radix-nova style**: Uses the latest versions which have fewer community examples but provide a cleaner, more modern developer experience.
- **localStorage over backend**: Keeps the stack simple with no server dependency. Data is lost if the user clears browser storage.
- **Single hook for state**: `useBundle` manages all state in one place, avoiding prop drilling without adding a full state management library.
- **Derived state**: Totals, savings, and item counts are computed from the items array rather than stored separately, preventing sync bugs.

## Future Improvements

- Image assets for each product and variant
- Drag-and-drop reordering of items in the review panel
- Shareable bundle URLs (encode state in query params)
- Multi-currency support
- Quantity presets (e.g., "Add 2 more")
- Undo/redo history for the builder
- Accessibility audit and keyboard navigation improvements
