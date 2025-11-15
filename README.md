# Canary Frontend

Frontend application for Canary - a parallel browser automation testing platform.

> Deploy the flock, ship with confidence.

## Getting Started

### Install

```bash
npm install
```

### Development

**⚠️ IMPORTANT: Always use `dev:logs` to enable development logging.**

This command pipes all server-side output (stdout and stderr) to `public/_logs.txt`.

```bash
npm run dev:logs
```

Your application will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

## Logging

This project uses a dual-mode logging system that behaves differently for local development and production.

-   **Local Development**: Logs are written to a file in `public/_logs.txt`.
-   **Production**: Client-side logs are sent to a Cloudflare KV store, and server-side logs are available via `wrangler tail`.

For complete implementation details, see [LOGGING_SKILL.md](./LOGGING_SKILL.md).

### Viewing Logs

-   **Local (Option A: HTTP)**
    ```bash
    curl http://localhost:5173/_logs.txt
    ```
-   **Local (Option B: File tail)**
    ```bash
    tail -f public/_logs.txt
    ```
-   **Production (Client Logs)**
    ```bash
    # Replace with your production domain
    curl https://your-app.workers.dev/_logs.txt
    ```
-   **Production (Server Logs)**
    ```bash
    npx wrangler tail
    ```

### Clearing Logs

-   **Local**
    ```bash
    rm public/_logs.txt
    ```
-   **Production**
    ```bash
    # This wipes the client-side logs from the KV store
    curl -X POST https://your-app.workers.dev/logs-clear
    ```

## Design System

See `canary-design-system.md` for the complete design system specification.

---

Built with React Router 7 and deployed on Cloudflare Workers.
