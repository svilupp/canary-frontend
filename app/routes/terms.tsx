import { Link } from "react-router";
import type { Route } from "./+types/terms";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Terms of Service - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[TERMS LOADER] Loading terms page");
  return {};
}

export default function Terms() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">TERMS OF SERVICE</h1>
        <p className="text-lg mb-8">The legal stuff.</p>
        <div className="card mb-md">
          <h3>Usage Terms</h3>
          <p>Use Canary responsibly, don't break other people's sites</p>
        </div>
        <div className="card">
          <h3>Liability</h3>
          <p>We're not responsible for your code bugs</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
