import { Link } from "react-router";
import type { Route } from "./+types/privacy";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Privacy Policy - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[PRIVACY LOADER] Loading privacy page");
  return {};
}

export default function Privacy() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">PRIVACY POLICY</h1>
        <p className="text-lg mb-8">We care about your data.</p>
        <div className="card mb-md">
          <h3>Data Collection</h3>
          <p>We only collect what's needed to run tests</p>
        </div>
        <div className="card">
          <h3>Your Rights</h3>
          <p>Access, delete, or export your data anytime</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
