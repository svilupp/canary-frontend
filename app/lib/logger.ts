/**
 * Cloudflare-compatible logging utility
 * Sends logs to KV storage via worker endpoint
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class CloudflareLogger {
  private buffer: LogEntry[] = [];
  private readonly bufferSize = 10;
  private readonly flushInterval = 5000; // 5 seconds
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly endpoint = "/__log";

  constructor() {
    // Only set up auto-flush in browser environment
    if (typeof window !== "undefined") {
      this.scheduleFlush();
    }
  }

  private scheduleFlush() {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
    }
    this.flushTimer = setTimeout(() => {
      this.flush();
    }, this.flushInterval);
  }

  private async flush() {
    // Only flush in browser context (server logs go to Cloudflare console)
    if (typeof window === "undefined") return;
    if (this.buffer.length === 0) return;

    const entries = [...this.buffer];
    this.buffer = [];

    try {
      await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
        // Don't wait for response in browser
        keepalive: true,
      });
    } catch (error) {
      // Silently fail - logging shouldn't break the app
      // Use original console.error to avoid recursion
      if (typeof console !== "undefined" && console.error) {
        const originalError = console.error;
        originalError("Failed to send logs:", error);
      }
    }

    // Reschedule next flush
    this.scheduleFlush();
  }

  private log(level: LogLevel, message: string, data?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    this.buffer.push(entry);

    // Flush immediately if buffer is full (only in browser)
    if (typeof window !== "undefined" && this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  debug(message: string, data?: unknown) {
    this.log("debug", message, data);
  }

  info(message: string, data?: unknown) {
    this.log("info", message, data);
  }

  warn(message: string, data?: unknown) {
    this.log("warn", message, data);
  }

  error(message: string, data?: unknown) {
    this.log("error", message, data);
  }
}

// Singleton instance
export const logger = new CloudflareLogger();

/**
 * Patch console methods to also send to KV storage
 * Call this early in your app initialization (CLIENT-SIDE ONLY)
 *
 * WARNING: Only call this in the browser (entry.client.tsx).
 * Do NOT call on the server - server logs already go to Cloudflare console.
 */
export function patchConsole() {
  // Safety check: only patch in browser environment
  if (typeof window === "undefined") {
    console.warn("patchConsole() should only be called in browser context. Skipping.");
    return;
  }

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalDebug = console.debug;

  console.log = (...args: unknown[]) => {
    originalLog(...args);
    logger.info(formatArgs(args));
  };

  console.warn = (...args: unknown[]) => {
    originalWarn(...args);
    logger.warn(formatArgs(args));
  };

  console.error = (...args: unknown[]) => {
    originalError(...args);
    logger.error(formatArgs(args));
  };

  console.debug = (...args: unknown[]) => {
    originalDebug(...args);
    logger.debug(formatArgs(args));
  };
}

function formatArgs(args: unknown[]): string {
  return args
    .map((arg) => {
      if (typeof arg === "string") return arg;
      if (arg instanceof Error) return `${arg.name}: ${arg.message}\n${arg.stack}`;
      try {
        return JSON.stringify(arg);
      } catch {
        return String(arg);
      }
    })
    .join(" ");
}

/**
 * Format log entry for storage
 */
export function formatLogEntry(entry: LogEntry): string {
  const level = entry.level.toUpperCase().padEnd(5);
  const data = entry.data ? ` ${JSON.stringify(entry.data)}` : "";
  return `[${entry.timestamp}] [${level}] ${entry.message}${data}`;
}
