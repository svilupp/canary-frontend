import { Link } from "react-router";

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img
            src="/favicon.ico"
            alt="Canary"
            className="logo-icon"
            style={{ background: "transparent" }}
          />
          <span>Canary</span>
        </Link>
        <nav className="flex gap-md">
          <Link to="/skills" className="btn btn-ghost btn-small">
            Skills
          </Link>
          <Link to="/docs" className="btn btn-ghost btn-small">
            Docs
          </Link>
          <Link to="/pricing" className="btn btn-outline btn-small">
            Start Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
