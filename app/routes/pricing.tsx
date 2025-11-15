import { Link } from "react-router";
import type { Route } from "./+types/pricing";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing - Canary" },
    { name: "description", content: "Canary is free forever. Zero dollars. Infinite tests. Just bring your own API keys." },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[PRICING LOADER] Loading pricing data");
  return { freeForever: true };
}

export default function Pricing() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-400 text-coal-black px-6 py-2 rounded-full font-display text-sm uppercase font-bold mb-6">
            FREE FOREVER
          </div>
          <h1 className="text-5xl md:text-6xl font-display uppercase font-bold mb-6">
            ZERO DOLLARS.<br />INFINITE TESTS.
          </h1>
          <p className="text-xl text-steel-darker dark:text-steel-lighter max-w-2xl mx-auto">
            Canary is free. Forever. No credit card. No limits. No gotchas.
            Just bring your own API keys.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="card card-highlighted mb-12 text-center py-12">
          <h2 className="text-4xl font-display uppercase font-bold mb-4">
            THE ONLY PLAN
          </h2>
          <div className="text-7xl font-display font-bold text-yellow-400 my-8">
            $0
          </div>
          <p className="text-2xl font-display uppercase mb-8">
            PER MONTH, PER YEAR, PER LIFETIME
          </p>

          <div className="max-w-md mx-auto text-left space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-xl mt-1">✓</div>
              <div>
                <strong className="font-display uppercase">Unlimited parallel tests</strong>
                <p className="text-sm text-steel-darker dark:text-steel-lighter">Run as many tests as your API keys allow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-xl mt-1">✓</div>
              <div>
                <strong className="font-display uppercase">All features included</strong>
                <p className="text-sm text-steel-darker dark:text-steel-lighter">No premium tiers, no paywalls</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-xl mt-1">✓</div>
              <div>
                <strong className="font-display uppercase">Open source</strong>
                <p className="text-sm text-steel-darker dark:text-steel-lighter">Self-host or use our cloud platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-yellow-400 text-xl mt-1">✓</div>
              <div>
                <strong className="font-display uppercase">Community support</strong>
                <p className="text-sm text-steel-darker dark:text-steel-lighter">Active Discord and GitHub discussions</p>
              </div>
            </div>
          </div>

          <Link to="/contact" className="btn btn-primary text-lg px-8 py-4">
            GET STARTED NOW
          </Link>
        </div>

        {/* BYOK Explanation */}
        <div className="bg-sky-light dark:bg-coal-darker rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-display uppercase font-bold mb-4">
            BRING YOUR OWN API KEYS
          </h3>
          <p className="text-steel-darker dark:text-steel-lighter mb-4">
            Canary doesn't charge you for browser automation. Instead, you connect your own API keys from providers like:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">→</span>
              <span className="font-mono text-sm">Browserless</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">→</span>
              <span className="font-mono text-sm">Playwright Service</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">→</span>
              <span className="font-mono text-sm">Selenium Grid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">→</span>
              <span className="font-mono text-sm">Your own infrastructure</span>
            </div>
          </div>
          <p className="text-sm text-steel-darker dark:text-steel-lighter">
            You pay those providers directly based on your usage. Canary orchestrates everything for free.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-display uppercase font-bold text-center mb-8">
            COMMON QUESTIONS
          </h3>

          <div className="border-l-4 border-yellow-400 pl-6 py-2">
            <h4 className="font-display uppercase font-bold mb-2">Is this really free?</h4>
            <p className="text-steel-darker dark:text-steel-lighter">
              Yes. Canary's platform is 100% free. You only pay your browser automation provider for the actual browser time you use.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6 py-2">
            <h4 className="font-display uppercase font-bold mb-2">Will you add paid plans later?</h4>
            <p className="text-steel-darker dark:text-steel-lighter">
              We might offer optional premium support or enterprise features, but the core platform will always be free.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6 py-2">
            <h4 className="font-display uppercase font-bold mb-2">How much will my API keys cost?</h4>
            <p className="text-steel-darker dark:text-steel-lighter">
              Depends on your provider and usage. Most offer generous free tiers. Browserless starts at $0/month for light use, Playwright Service has pay-as-you-go pricing.
            </p>
          </div>

          <div className="border-l-4 border-yellow-400 pl-6 py-2">
            <h4 className="font-display uppercase font-bold mb-2">Can I self-host?</h4>
            <p className="text-steel-darker dark:text-steel-lighter">
              Absolutely. Canary is open source. Run it on your own infrastructure with zero cost beyond your hosting.
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/" className="btn btn-outline">
            BACK TO HOME
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
