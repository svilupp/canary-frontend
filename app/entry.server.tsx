import type { AppLoadContext, EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

// NOTE: We do NOT patch console on the server.
// Server-side console.log already goes to Cloudflare logs (wrangler dev / dashboard).
// Patching only happens on the client (see entry.client.tsx).

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext
) {
  const startTime = Date.now();
  let shellRendered = false;
  const url = new URL(request.url);
  const userAgent = request.headers.get("user-agent");
  const referer = request.headers.get("referer");
  const isBot = userAgent && isbot(userAgent);

  // Log incoming request with context
  console.log(
    `[SSR] ${request.method} ${url.pathname}${url.search} | UA: ${userAgent?.substring(0, 50) || "none"}${isBot ? " [BOT]" : ""}`
  );

  if (referer) {
    console.log(`[SSR] Referer: ${referer}`);
  }

  try {
    const body = await renderToReadableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error("[SSR] Streaming render error:", {
              error: error instanceof Error ? error.message : String(error),
              stack: error instanceof Error ? error.stack : undefined,
              url: url.pathname,
            });
          }
        },
      }
    );
    shellRendered = true;

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    if (isBot || routerContext.isSpaMode) {
      console.log(`[SSR] Waiting for allReady (bot or SPA mode) | ${url.pathname}`);
      await body.allReady;
    }

    const duration = Date.now() - startTime;
    console.log(
      `[SSR] Response ${responseStatusCode} for ${url.pathname} | ${duration}ms`
    );

    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error("[SSR] Fatal error during render:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: url.pathname,
      method: request.method,
      duration: `${duration}ms`,
    });

    // Re-throw to let React Router handle it
    throw error;
  }
}
