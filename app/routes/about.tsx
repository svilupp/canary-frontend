import { Link } from "react-router";
import type { Route } from "./+types/about";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Canary" },
    { name: "description", content: "About Canary" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[ABOUT LOADER] Loading about page");
  return { founded: 2025 };
}

export default function About() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">ABOUT CANARY</h1>
      <p className="text-lg mb-8">Built by developers who ship too fast and regret it later.</p>

      <div className="card mb-lg">
        <h3>MISSION</h3>
        <p>Enable developers to vibe code at light speed without breaking production.</p>
      </div>

      <div className="card">
        <h3>TEAM</h3>
        <p>Remote-first. Ship-fast culture. We eat our own dog food (canary food?).</p>
      </div>

      <div className="mt-xl">
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
      </div>
    </PageLayout>
  );
}
