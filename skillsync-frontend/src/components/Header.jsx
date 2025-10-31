// src/components/Header.jsx
import { Link } from 'preact-router/match';

function Header({ assessmentComplete }) {
  const homeHref = assessmentComplete ? '/dashboard' : '/';
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-success" href={homeHref}>
          SkillSync AI 🧠
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/">Assessment</Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/pathways">Career Pathways</Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/login">Sign in</Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/signup">Sign up</Link>
            </li>
            <li className="nav-item">
              <Link activeClassName="active" className="nav-link" href="/portfolio">Portfolio Builder</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;