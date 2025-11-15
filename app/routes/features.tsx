import { Link } from "react-router";
import type { Route } from "./+types/features";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Features - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[FEATURES LOADER] Loading features page");
  return { featureCount: 8 };
}

export default function Features() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">FEATURES</h1>
      <p className="text-lg mb-8">Everything you need to ship with confidence.</p>
      <div className="grid grid-2 gap-md">
        <div className="card">
          <h3>Parallel Testing</h3>
          <p>Run dozens of tests simultaneously</p>
        </div>
        <div className="card">
          <h3>Dual Log Access</h3>
          <p>Browser + server logs in one view</p>
        </div>
        <div className="card">
          <h3>Cloud Skills</h3>
          <p>Self-improving knowledge base</p>
        </div>
        <div className="card">
          <h3>Real-Time Results</h3>
          <p>Know what broke instantly</p>
        </div>
      </div>
      <div className="mt-xl">
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
      </div>
    </PageLayout>
  );
}
