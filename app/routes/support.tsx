import { Link } from "react-router";
import type { Route } from "./+types/support";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Support - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[SUPPORT LOADER] Loading support page");
  return {};
}

export default function Support() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">SUPPORT</h1>
        <p className="text-lg mb-8">We're here to help the flock fly.</p>
        <div className="card">
          <h3>Need Help?</h3>
          <p>support@canaryqa.dev</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
