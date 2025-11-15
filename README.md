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


## Running Tests with Canary App

This frontend is for visualizing the results of the Canary App, the AI-powered QA testing system. To run tests and generate results, you need to use the `canary-app` CLI.

1.  **Get the Canary App CLI**

    Clone the repository from GitHub and navigate into the directory:
    ```bash
    git clone https://github.com/svilupp/canary-app.git
    cd canary-app
    ```

2.  **Installation and Configuration**

    Install the necessary dependencies and set up your environment variables by creating a `.env` file.
    ```bash
    npm install
    cp .env.example .env
    ```
    You will need to edit the `.env` file to add your API keys for Browserbase and Google AI.

3.  **Run a Test**

    Use the `npm run qa` command to start a test run.

    *   **Run a cloud test:**
        ```bash
        npm run qa -- --url https://your-app.com
        ```
    *   **Run a local test:**
        ```bash
        npm run qa -- --url https://your-app.com --local
        ```

4.  **Most Important CLI Commands**

    *   `npm run qa -- --url <url>`: (Required) The target URL to test.
    *   `npm run qa -- --local`: Run the test on your local machine with a visible Chrome window.
    *   `npm run qa -- --url <url> --stage <number>`: Limit the test to a specific stage (e.g., `--stage 1` for initial load).
    *   `npm run qa -- -n <number>`: Set the number of parallel sessions in cloud mode.

    For more details, refer to the `README.md` inside the `canary-app` repository.

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
