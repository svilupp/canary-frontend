import { Link } from "react-router";
import type { Route } from "./+types/blog";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Blog - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[BLOG LOADER] Loading blog posts");
  return { posts: 8 };
}

export default function Blog() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">BLOG</h1>
      <div className="card mb-md">
        <h3>Why We Built Canary</h3>
        <p className="text-sm">March 15, 2025</p>
      </div>
      <div className="card mb-md">
        <h3>Parallel Testing at Scale</h3>
        <p className="text-sm">March 10, 2025</p>
      </div>
      <div className="mt-xl">
        <Link to="/" className="btn btn-outline">Back to Home</Link>
      </div>
      </div>
    </PageLayout>
  );
}
