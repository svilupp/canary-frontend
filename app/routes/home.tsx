import { useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { PageLayout } from "~/lib/components/PageLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Canary - Parallel AI Testing for Apps Built Fast | Browser Automation" },
    { name: "description", content: "Deploy a squadron of AI agents to test your app in parallel. See browser + server logs. Self-improving QA that keeps up with vibe coding speed. Start free." },
  ];
}

// Example loader with comprehensive logging
export async function loader({ request }: Route.LoaderArgs) {
  const startTime = Date.now();
  const url = new URL(request.url);

  console.log(`[HOME LOADER] Loading data | params: ${url.searchParams.toString() || "none"}`);

  try {
    // Simulate data fetching
    const data = {
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      features: ["parallel-testing", "dual-logs", "cloud-skills"],
    };

    const duration = Date.now() - startTime;
    console.log(`[HOME LOADER] Data loaded successfully | ${duration}ms`, data);

    return data;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[HOME LOADER] Failed to load data | ${duration}ms`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    throw error;
  }
}

export default function Home() {
  // Client-side lifecycle logging
  useEffect(() => {
    console.log("[HOME] Component mounted | Client-side hydration complete");

    // Log interactions
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        console.log(`[HOME] Navigation: ${target.getAttribute("href")}`);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      console.log("[HOME] Component unmounting");
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <PageLayout>
        {/* Hero Section */}
        <section className="section hero">
          <div className="hero-content">
            <h1 className="hero-headline">
              Vibe Code at Light Speed.<br />Ship With Zero Anxiety.
            </h1>
            <p className="hero-subheadline">
              AI agents patrol your app in parallel—testing checkout flows, auth systems, and that button you built at 4am. Deploy the flock, own the demo.
            </p>

            <div className="hero-cta" style={{ marginBottom: 'var(--spacing-md)' }}>
              <Link to="/docs" className="btn btn-primary btn-large">Deploy Your Squadron (For Free)</Link>
              <a href="#testimonials" className="btn btn-outline btn-large">See Totally Real Reviews</a>
            </div>

            <img
              src="/canary-front.png"
              alt="Canary squadron mascot ready to test your application"
              className="hero-mascot"
              style={{ marginTop: 'var(--spacing-md)' }}
            />

            <p className="hero-caption">
              Parallel testing. Server + browser logs. Self-improving AI agents. Finally, a QA tool that keeps up with your 3am hackathon energy.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="section">
          <div className="container">
            <div className="problem-section">
              <h2 className="text-center">THE REALITY OF VIBE CODING</h2>

              <div className="problem-grid">
                <div className="problem-card">
                  <span className="problem-icon" role="img" aria-label="Alert">🚨</span>
                  <h3 className="problem-title">2 Minutes to Demo</h3>
                  <p className="problem-text">
                    You click the submit button. Nothing happens. You check the console. Nothing. You check the backend. Also nothing. Your investor is on Zoom. You panic.
                  </p>
                </div>

                <div className="problem-card">
                  <span className="problem-icon" role="img" aria-label="Lightning">⚡</span>
                  <h3 className="problem-title">Testing Doesn't Scale</h3>
                  <p className="problem-text">
                    You manually clicked 5 buttons. There are 47 interactive elements. You tested the happy path. Users will find the 12 edge cases you missed.
                  </p>
                </div>

                <div className="problem-card">
                  <span className="problem-icon" role="img" aria-label="Tools">🔧</span>
                  <h3 className="problem-title">Debug Hell</h3>
                  <p className="problem-text">
                    Browser says "network error." Server logs say "timeout." You see one or the other, never both. Hunting down the real issue takes 30 minutes you don't have.
                  </p>
                </div>
              </div>

              <div className="section-closer">
                Your app should work as fast as you built it.
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">MEET YOUR QA SQUADRON</h2>
            <p className="text-large text-center mb-xl" style={{ maxWidth: '800px', margin: '0 auto var(--spacing-2xl)' }}>
              Canary deploys multiple AI agents in parallel to test your entire application while you sleep. Each canary is an autonomous QA engineer that doesn't just click buttons—it understands your app, learns from failures, and gets smarter every run.
            </p>

            <div className="grid grid-3">
              <div className="card">
                <span className="card-icon" role="img" aria-label="Squadron">🐤🐤🐤</span>
                <div className="card-header">
                  <h3 className="card-title">Parallel by Default</h3>
                </div>
                <p>
                  One canary tests your login flow. Another hammers the checkout. A third explores edge cases. All at the same time. No more sequential testing that takes hours.
                </p>
              </div>

              <div className="card card-highlighted">
                <span className="card-icon" role="img" aria-label="Logs">📋</span>
                <div className="card-header">
                  <h3 className="card-title">Full-Stack Vision</h3>
                </div>
                <p>
                  Our agents see browser logs AND server logs simultaneously. In dev mode, we expose <code className="text-mono">--logs</code> so your squadron has complete context. No more blind debugging between frontend and backend.
                </p>
              </div>

              <div className="card">
                <span className="card-icon" role="img" aria-label="Brain">🧠</span>
                <div className="card-header">
                  <h3 className="card-title">Self-Improving Skills</h3>
                </div>
                <p>
                  After every test, agents reflect and contribute to a shared skill database. Each run makes the entire squadron smarter. Your QA system evolves with your codebase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section">
          <div className="container">
            <h2 className="text-center">FROM CHAOS TO CONFIDENCE IN 3 STEPS</h2>

            <div className="grid grid-3 mt-xl">
              <div className="card">
                <div className="flex-center" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                  <span className="badge badge-yellow" style={{ fontSize: '2rem', padding: 'var(--spacing-md)' }}>1</span>
                </div>
                <h3 className="text-center">Deploy</h3>
                <p className="text-center">
                  Point Canary at your dev environment. Configure your test scenarios. Launch the squadron.
                </p>
              </div>

              <div className="card">
                <div className="flex-center" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                  <span className="badge badge-yellow" style={{ fontSize: '2rem', padding: 'var(--spacing-md)' }}>2</span>
                </div>
                <h3 className="text-center">Monitor</h3>
                <p className="text-center">
                  Watch in real-time as canaries patrol your app, testing flows in parallel. See exactly which canary found which issue.
                </p>
              </div>

              <div className="card">
                <div className="flex-center" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                  <span className="badge badge-yellow" style={{ fontSize: '2rem', padding: 'var(--spacing-md)' }}>3</span>
                </div>
                <h3 className="text-center">Fix & Improve</h3>
                <p className="text-center">
                  Get detailed error reports with BOTH browser and server context. Agents automatically create/update skills for future runs. Ship with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="section">
          <div className="container">
            <h2 className="text-center">BUILT FOR SPEED</h2>

            <ul className="feature-list mt-xl">
              <li className="feature-item">
                <strong>Parallel Testing</strong> - Run dozens of test scenarios simultaneously
              </li>
              <li className="feature-item">
                <strong>Dual Log Access</strong> - Browser + server logs in one view
              </li>
              <li className="feature-item">
                <strong>Cloud Skills</strong> - Extensible, self-improving knowledge base
              </li>
              <li className="feature-item">
                <strong>Forced Reflection</strong> - Every agent learns after every job
              </li>
              <li className="feature-item">
                <strong>Computer Use Agents</strong> - Smart automation that adapts
              </li>
              <li className="feature-item">
                <strong>Real-Time Results</strong> - Know what broke the moment it breaks
              </li>
              <li className="feature-item">
                <strong>Error Hypotheses</strong> - Agents don't just report, they analyze
              </li>
              <li className="feature-item">
                <strong>Vibe-Code Ready</strong> - Built for apps shipped fast
              </li>
            </ul>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section">
          <div className="container">
            <h2 className="text-center">TOTALLY REAL TESTIMONIALS*</h2>
            <p className="text-center" style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
              *We made these up. But you'll say the same things once you deploy the flock.
            </p>

            <div className="grid grid-3 mt-xl">
              <div className="testimonial-card">
                <div className="testimonial-avatar flex-center" style={{ background: 'var(--color-steel-light)', fontSize: '2rem' }}>
                  👨‍💻
                </div>
                <h4 className="testimonial-name">Marcus "Definitely Real" Chen</h4>
                <p className="testimonial-title">Serial Hackathon Winner</p>
                <p className="testimonial-quote">
                  "This has genuinely improved my hair loss problem. During hackathons, I used to pull my hair out when the app broke 2 minutes before submission. Now my canaries catch everything while I'm perfecting the pitch deck. 10/10 for my follicles."
                </p>
                <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-avatar flex-center" style={{ background: 'var(--color-steel-light)', fontSize: '2rem' }}>
                  👩‍💻
                </div>
                <h4 className="testimonial-name">Sarah "Not AI" Rodriguez</h4>
                <p className="testimonial-title">Indie Hacker & Founder</p>
                <p className="testimonial-quote">
                  "Even when I was doing testing myself, I could only check a few buttons before shipping. It didn't scale. Now with my Yellow Canary fleet, I have tens of tests running in parallel. I actually sleep at night knowing my payment flow works."
                </p>
                <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-avatar flex-center" style={{ background: 'var(--color-steel-light)', fontSize: '2rem' }}>
                  🎨
                </div>
                <h4 className="testimonial-name">Alex "Actual Person" Kim</h4>
                <p className="testimonial-title">Product Designer</p>
                <p className="testimonial-quote">
                  "I don't really know what this does, but the yellow canaries are super cute and my dev team keeps saying it saves them hours. That's a win in my book. Also, can I get canary stickers?"
                </p>
                <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container text-center">
            <div style={{
              background: 'var(--bg-secondary)',
              padding: 'var(--spacing-3xl) var(--spacing-xl)',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid var(--color-canary-yellow)',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h2>READY TO STOP DEBUGGING AT 3AM?</h2>
              <p className="text-large mb-xl">
                Join developers who ship fast and break nothing. Deploy your squadron in under 5 minutes.
              </p>

              <div className="hero-cta">
                <Link to="/docs" className="btn btn-primary btn-large">Start Free Trial</Link>
                <Link to="/docs#quick-start" className="btn btn-secondary btn-large">Quick Start Guide</Link>
              </div>

              <div className="flex-center gap-md mt-lg" style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
                <span>✓ No credit card required</span>
                <span>✓ Open source core</span>
                <span>✓ Deploy in 5 minutes</span>
              </div>
            </div>
          </div>
        </section>
    </PageLayout>
  );
}
