import { Link } from "react-router";
import type { Route } from "./+types/contact";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Contact - Canary" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[CONTACT LOADER] Loading contact page");
  return {};
}

export default function Contact() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">CONTACT US</h1>
        <p className="text-lg mb-8">Get in touch with the flock.</p>
        <div className="card">
          <p>Email: hello@canaryqa.dev</p>
          <p className="mt-sm">Twitter: @canaryqa</p>
          <p className="mt-sm">Discord: /canary</p>
        </div>
        <div className="mt-xl">
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </PageLayout>
  );
}
