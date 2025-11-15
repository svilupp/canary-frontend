import { Link } from "react-router";
import type { Route } from "./+types/changelog";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Changelog - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[CHANGELOG LOADER] Loading changelog");
  return {};
}

export default function Changelog() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">CHANGELOG</h1>
        <div className="card mb-md">
          <h3>v1.0.0 - March 2025</h3>
          <p>Initial release</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
