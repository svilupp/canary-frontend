import { Link } from "react-router";
import type { Route } from "./+types/careers";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Careers - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[CAREERS LOADER] Loading careers page");
  return {};
}

export default function Careers() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">CAREERS</h1>
        <p className="text-lg mb-8">Join the flock. Work on tools developers actually love.</p>
        <div className="card mb-md">
          <h3>Senior Backend Engineer</h3>
          <p>Remote | Full-time</p>
        </div>
        <div className="card mb-md">
          <h3>DevRel Engineer</h3>
          <p>Remote | Full-time</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
