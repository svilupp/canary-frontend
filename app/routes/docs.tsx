import { Link } from "react-router";
import type { Route } from "./+types/docs";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentation - Canary" },
    { name: "description", content: "Canary documentation" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  console.log("[DOCS LOADER] Loading documentation");
  return { sections: 12 };
}

export default function Docs() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 uppercase">DOCUMENTATION</h1>
      <p className="text-lg mb-12">Learn to deploy your squadron.</p>

      {/* Quick Start Section */}
      <section id="quick-start" className="mb-16">
        <h2 className="text-3xl font-bold mb-6 uppercase">Quick Start</h2>

        <div className="mb-8 p-4 bg-blue-500/10 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold mb-3 uppercase">Before You Fly</h3>
          <p className="mb-4">
            First, sync the Canary testing tool from <a href="https://github.com/svilupp/canary-app" className="text-yellow-500 hover:underline" target="_blank" rel="noopener noreferrer">github.com/svilupp/canary-app</a> (unpublished, in development):
          </p>

          <div className="bg-gray-900 p-4 rounded mb-4">
            <pre className="text-sm text-gray-300">
{`git clone https://github.com/svilupp/canary-app.git
cd canary-app
npm install`}
            </pre>
          </div>

          <p className="mb-4">
            Then, instrument your app to expose server logs before running Canary tests:
          </p>

          <div className="bg-gray-900 p-4 rounded mb-4">
            <code className="text-sm text-green-400">
              npm run qa --url YOUR_URL
            </code>
          </div>

          <p className="text-sm text-gray-400">
            Example: <code>npm run qa --url https://staging.example.com</code>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 uppercase">Step 1: Enable Logging</h3>
          <p className="mb-4">
            Add one line to your <code>package.json</code> to pipe logs to your public folder:
          </p>

          <div className="bg-gray-900 p-4 rounded mb-4">
            <pre className="text-sm text-gray-300">
{`{
  "scripts": {
    "dev:logs": "your-dev-command 2>&1 | tee public/_logs.txt"
  }
}`}
            </pre>
          </div>

          <p className="mb-4">Examples for common frameworks:</p>

          <div className="bg-gray-900 p-4 rounded mb-2">
            <pre className="text-sm text-gray-300">
{`// React Router / Vite
"dev:logs": "react-router dev 2>&1 | tee public/_logs.txt"

// Next.js
"dev:logs": "next dev 2>&1 | tee public/_logs.txt"

// Node/Express (with static public folder)
"dev:logs": "node server.js 2>&1 | tee public/_logs.txt"`}
            </pre>
          </div>

          <div className="mt-4 p-4 bg-green-500/10 border-l-4 border-green-500">
            <p className="text-sm font-semibold uppercase mb-2">Why public/_logs.txt?</p>
            <p className="text-sm">
              Most frameworks automatically serve files from <code>public/</code> as static assets. This means <code>public/_logs.txt</code> is automatically available at <code>/_logs.txt</code> with zero configuration!
            </p>
          </div>

          <div className="mt-4 p-4 bg-yellow-500/10 border-l-4 border-yellow-500">
            <p className="text-sm font-semibold uppercase mb-2">Important</p>
            <p className="text-sm">
              Add <code>public/_logs.txt</code> to your <code>.gitignore</code>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 uppercase">Step 2: Production Logging (Optional)</h3>

          <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500 mb-6">
            <p className="text-sm">
              <strong>For local development:</strong> Skip this step! The file in <code>public/_logs.txt</code> is automatically served at <code>/_logs.txt</code>. No code needed.
            </p>
          </div>

          <p className="mb-4">
            For production deployments without filesystem (Cloudflare Workers, Vercel Edge, etc.), use KV storage:
          </p>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-2 uppercase text-yellow-500">Cloudflare Workers + KV</h4>

            <div className="bg-gray-900 p-4 rounded mb-2">
              <p className="text-sm text-gray-400 mb-2">1. Create KV namespace:</p>
              <pre className="text-sm text-gray-300">
{`npx wrangler kv namespace create LOGS
npx wrangler kv namespace create LOGS --preview`}
              </pre>
            </div>

            <div className="bg-gray-900 p-4 rounded mb-2">
              <p className="text-sm text-gray-400 mb-2">2. Add to wrangler.jsonc:</p>
              <pre className="text-sm text-gray-300">
{`{
  "kv_namespaces": [{
    "binding": "LOGS",
    "id": "YOUR_PRODUCTION_ID",
    "preview_id": "YOUR_PREVIEW_ID"
  }]
}`}
              </pre>
            </div>

            <div className="bg-gray-900 p-4 rounded mb-2">
              <p className="text-sm text-gray-400 mb-2">3. Add endpoint in your worker:</p>
              <pre className="text-sm text-gray-300">
{`if (url.pathname === "/_logs.txt") {
  const logs = await env.LOGS.get("app-logs") ?? "";
  return new Response(logs, {
    headers: { "Content-Type": "text/plain" }
  });
}`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-2 uppercase text-yellow-500">Other Edge Platforms</h4>

            <div className="bg-gray-900 p-4 rounded mb-2">
              <p className="text-sm text-gray-400 mb-2">Vercel/Netlify:</p>
              <pre className="text-sm text-gray-300">
{`// Use Vercel KV or Upstash Redis
import { kv } from "@vercel/kv";

export async function GET() {
  const logs = await kv.get("app-logs") || "";
  return new Response(logs, {
    headers: { "Content-Type": "text/plain" }
  });
}`}
              </pre>
            </div>

            <div className="bg-gray-900 p-4 rounded mb-2">
              <p className="text-sm text-gray-400 mb-2">Traditional servers with filesystem:</p>
              <pre className="text-sm text-gray-300">
{`// No setup needed - just deploy with public/ folder
// public/_logs.txt will be served automatically`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 uppercase">Step 3: Verify</h3>

          <div className="bg-gray-900 p-4 rounded mb-4">
            <pre className="text-sm text-gray-300">
{`# Start your dev server with logging
npm run dev:logs

# In another terminal, check logs are accessible
curl http://localhost:YOUR_PORT/_logs.txt`}
            </pre>
          </div>

          <p className="mb-4">You should see your server logs. If empty, make some requests to generate logs.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 uppercase">Step 4: Deploy the Flock</h3>

          <p className="mb-4">
            Once your application's logging is accessible, you can run Canary to audit your page. You can run tests locally for development or in the cloud for more comprehensive, parallel testing.
          </p>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-2 uppercase text-yellow-500">Local Audit (Development)</h4>
            <p className="mb-2 text-sm">
              Use the <code>--local</code> flag to run tests on your local machine using a real Chrome browser window. No Browserbase account? No problem! This mode is great for local development and debugging.
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <pre className="text-sm text-gray-300">
{`# Run a local audit against your dev server
npm run qa -- --url http://localhost:YOUR_PORT --local`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-lg mb-2 uppercase text-yellow-500">Cloud Audit (Staging/Production)</h4>
            <p className="mb-2 text-sm">
              For CI/CD or production environments, run Canary against Browserbase. Without the <code>--local</code> flag, it will all run in parallel against Browserbase sessions for speed and scale.
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <pre className="text-sm text-gray-300">
{`# Run a parallel cloud audit against your live app
npm run qa -- --url https://staging.example.com`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-xl">
        <Link to="/" className="btn btn-outline uppercase">Back to Home</Link>
      </div>
      </div>
    </PageLayout>
  );
}
