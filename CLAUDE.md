# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL DEVELOPMENT RULE ⚠️

**ALWAYS use `npm run dev:logs` to start the development server - NEVER use `npm run dev`**

This is EXTREMELY important because:
- `npm run dev:logs` enables proper logging and debugging capabilities
- Without it, we cannot access development logs which are critical for development
- This is a non-negotiable requirement for all development work

**Before starting ANY development work, you MUST run: `npm run dev:logs`**

## Project Overview

Canary is a browser automation testing platform with a bold, industrial-meets-friendly design system. This is the frontend application built with React Router 7, deployed on Cloudflare Workers.

**Core Stack:**
- React Router 7 (SSR-enabled)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Cloudflare Workers (deployment target)
- Vite (build tool)

## Common Commands

### Development
```bash
npm run dev:logs         # Start dev server with logs (localhost:5173) - ALWAYS USE THIS
npm run typecheck        # Run TypeScript type checking
npm run cf-typegen       # Generate Cloudflare Worker types
```

### Building & Deployment
```bash
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run deploy           # Build and deploy to Cloudflare Workers
```

### Cloudflare-specific
```bash
npx wrangler versions upload   # Deploy preview version
npx wrangler versions deploy   # Promote version to production
```

## Architecture

### Routing System
Routes are configured in `app/routes.ts` using React Router's file-based routing. The project uses a type-safe routing system with auto-generated types.

- Routes defined in: `app/routes.ts`
- Route components in: `app/routes/`
- Root layout: `app/root.tsx` (provides `Layout` component and `ErrorBoundary`)

### Cloudflare Workers Integration
The app runs on Cloudflare Workers with server-side rendering:

- Worker entry point: `workers/app.ts`
- Worker config: `wrangler.jsonc`
- AppLoadContext is extended with Cloudflare-specific types (env, ctx)
- Access Cloudflare bindings via `context.cloudflare.env`

### Server-Side Rendering
SSR is configured in `react-router.config.ts` with:
- `ssr: true` - Enables server-side rendering
- Bot detection via `isbot` library
- Streaming rendering with `renderToReadableStream`
- Graceful error boundaries in `app/root.tsx`

### Type System
TypeScript is configured with project references:
- `tsconfig.json` - Root config (strict mode enabled)
- `tsconfig.node.json` - Node-specific config
- `tsconfig.cloudflare.json` - Cloudflare Workers config
- `worker-configuration.d.ts` - Auto-generated Worker types (do not edit manually)

Type generation happens automatically on `postinstall`.

## Design System

The project follows the **Canary Design System** documented in `canary-design-system.md`. Key principles:

### Colors
- Primary brand: `#FFD60A` (canary yellow) - Use for CTAs and active states
- Structural: Steel palette (`#415A77` to `#9BABC2`)
- Backgrounds: Sky pale/light (light mode), Coal black/darker (dark mode)
- Status: Green (success), Red (errors), Orange (warnings)

**Important:** Yellow should be used sparingly for maximum impact. Avoid large yellow backgrounds.

### Typography
- **Display font (headers/labels/buttons):** IBM Plex Sans Condensed - ALWAYS UPPERCASE
- **Body font:** Sora
- **Monospace (code):** JetBrains Mono
- Currently using Inter as placeholder - replace with Sora for body text when implementing components

### Component Patterns
- All interactive elements need hover states (lift effect + color shift)
- Cards have 4px yellow accent strip on hover
- Buttons use uppercase display font with shine effect
- Forms use yellow focus rings
- Animations respect `prefers-reduced-motion`

### Voice & Tone
Copy should be:
- Direct and action-oriented (avoid fluff)
- Technically credible (use proper terms)
- Slightly playful but professional
- Example: "Deploying the flock..." vs "Processing your request..."

## File Structure

```
app/
├── routes.ts          # Route configuration
├── root.tsx           # Root layout, error boundary
├── entry.server.tsx   # SSR entry point
├── app.css            # Global styles
├── routes/            # Route components
│   └── home.tsx
└── welcome/           # Welcome components
    ├── welcome.tsx
    ├── logo-dark.svg
    └── logo-light.svg

workers/
└── app.ts             # Cloudflare Worker entry

public/                # Static assets
```

## Working with Components

When creating new components:
1. Use TypeScript with proper Route types (e.g., `Route.ComponentProps`)
2. Follow the design system color palette and typography
3. Ensure responsive behavior (mobile-first)
4. Add proper ARIA labels and semantic HTML
5. Test keyboard navigation
6. Use Tailwind CSS for styling

## Adding New Routes

1. Define route in `app/routes.ts`:
```typescript
export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
] satisfies RouteConfig;
```

2. Create component in `app/routes/` with proper types:
```typescript
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "About page" },
  ];
}

export default function About() {
  return <div>About</div>;
}
```

## Environment Variables & Secrets

- Configure in `wrangler.jsonc` under `vars` (non-sensitive)
- Use Cloudflare secrets for sensitive data: `npx wrangler secret put SECRET_NAME`
- Access via `context.cloudflare.env` in loaders/actions

## Testing Strategy

No testing framework is currently configured. When adding tests:
- Consider Vitest for unit tests
- Consider Playwright for E2E tests (aligns with Canary's browser automation theme)
- Test SSR behavior separately from client-side

## Development Notes

- The app uses React Router 7's new Vite-based architecture
- Hot Module Replacement (HMR) is enabled in dev mode
- TypeScript is in strict mode - all types must be properly defined
- The project uses `verbatimModuleSyntax` for ESM compliance
- Always run `npm run typecheck` before committing

## Cloudflare-Specific Considerations

- The app runs in a Worker environment (no Node.js APIs available)
- Use Web APIs instead of Node APIs
- Be mindful of CPU time limits in Workers
- Static assets are bundled with the Worker
- Check `wrangler.jsonc` for compatibility_date and feature flags

## Design System Implementation

Reference files for implementation:
- Full design system spec: `canary-design-system.md`
- HTML component examples: `canary-design-system.html`
- Landing page content: `landing.md`

When building UI:
- Use CSS custom properties from design system
- Follow the "bold over timid" principle (dominant yellow with sharp accents)
- Implement staggered page load animations
- Add flight path animations for active states (when relevant)
- Test both light and dark modes

## Brand Identity

Canary is:
- A parallel browser automation testing platform
- Targeted at developers who "vibe code" and ship fast
- Brand personality: Industrial safety equipment meets friendly character
- Tagline: "Deploy the flock, ship with confidence"
- Yellow canaries are the mascot (cute but functional)
