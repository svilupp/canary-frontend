import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>CANARY</h4>
            <p
              style={{
                color: "var(--color-sky-pale)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
              }}
            >
              Browser Automation for Vibe Coders. Built by developers who ship
              too fast and regret it later.
            </p>
            <p
              style={{
                color: "var(--color-canary-yellow)",
                fontStyle: "italic",
                marginTop: "var(--spacing-md)",
              }}
            >
              Deploy the flock, ship with confidence. 🐤
            </p>
          </div>

          <div className="footer-section">
            <h4>PRODUCT</h4>
            <ul className="footer-links">
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/docs">Documentation</Link>
              </li>
              <li>
                <Link to="/changelog">Changelog</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>COMPANY</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>COMMUNITY</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Canary QA. All rights reserved.</p>
          <div className="flex-center gap-md mt-sm">
            <Link
              to="/privacy"
              style={{ color: "var(--color-sky-pale)", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              style={{ color: "var(--color-sky-pale)", textDecoration: "none" }}
            >
              Terms of Service
            </Link>
            <span>•</span>
            <Link
              to="/kill-app"
              style={{ color: "var(--color-warning)", textDecoration: "none" }}
            >
              Kill this app
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
