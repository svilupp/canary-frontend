import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { patchConsole } from "./lib/logger";

// Patch console on client startup
patchConsole();

console.log("[CLIENT] Application hydrating");

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});

console.log("[CLIENT] Application hydrated");
