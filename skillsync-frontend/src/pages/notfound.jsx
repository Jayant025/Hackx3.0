// src/pages/NotFound.jsx
import { Link } from 'preact-router/match';

export default function NotFound() {
  return (
    <div className="container py-5">
      <div className="text-center my-5">
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead text-muted mb-4">Oops! The page you’re looking for doesn’t exist.</p>
        <div className="d-flex gap-2 justify-content-center">
          <Link href="/" className="btn btn-outline-primary">Go to Assessment</Link>
          <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}