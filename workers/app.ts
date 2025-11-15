import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

const LOG_KEY = "app-logs";
const MAX_LOG_SIZE = 500_000; // 500KB

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: unknown;
}

function formatLogEntry(entry: LogEntry): string {
  const level = entry.level.toUpperCase().padEnd(5);
  const data = entry.data ? ` ${JSON.stringify(entry.data)}` : "";
  return `[${entry.timestamp}] [${level}] ${entry.message}${data}`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Log retrieval endpoint (production only - dev serves from public/_logs.txt)
    if (url.pathname === "/_logs.txt") {
      try {
        const logs = (await env.LOGS.get(LOG_KEY)) ?? "";
        return new Response(logs, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        });
      } catch (error) {
        return new Response(
          `Error retrieving logs: ${error instanceof Error ? error.message : "Unknown error"}`,
          {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          }
        );
      }
    }

    // Log clear endpoint (wipes KV store)
    if (url.pathname === "/logs-clear" && request.method === "POST") {
      try {
        await env.LOGS.delete(LOG_KEY);
        return new Response("Logs cleared successfully", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      } catch (error) {
        console.error("Log clear error:", error);
        return new Response(
          `Error clearing logs: ${error instanceof Error ? error.message : "Unknown error"}`,
          {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          }
        );
      }
    }

    // Log ingestion endpoint
    if (url.pathname === "/__log" && request.method === "POST") {
      try {
        const entries: LogEntry[] = await request.json();

        // Format new log entries
        const newLogs = entries.map(formatLogEntry).join("\n") + "\n";

        // Get existing logs
        const existing = (await env.LOGS.get(LOG_KEY)) ?? "";

        // Append new logs
        let updated = existing + newLogs;

        // Trim to max size (keep most recent logs)
        if (updated.length > MAX_LOG_SIZE) {
          updated = updated.slice(-MAX_LOG_SIZE);
          // Ensure we start at a line boundary
          const firstNewline = updated.indexOf("\n");
          if (firstNewline > 0) {
            updated = updated.slice(firstNewline + 1);
          }
        }

        // Write back to KV (non-blocking)
        ctx.waitUntil(env.LOGS.put(LOG_KEY, updated));

        return new Response("ok", { status: 200 });
      } catch (error) {
        console.error("Log ingestion error:", error);
        return new Response(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
          { status: 500 }
        );
      }
    }

    // Pass all other requests to React Router
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;
