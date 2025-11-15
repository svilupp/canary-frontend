import type { Route } from "./+types/kill-app";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Kill App - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[KILL-APP LOADER] Throwing intentional error");
  throw new Error("Intentional error for testing!");
}

export default function KillApp() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">THIS SHOULD NEVER APPEAR</h1>
        <p>If you see this, the error wasn't thrown correctly.</p>
      </div>
    </PageLayout>
  );
}
