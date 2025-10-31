// src/pages/SignUp.jsx
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      try { localStorage.setItem('authToken', data.token); localStorage.setItem('authUser', JSON.stringify(data.user)); } catch {}
      route('/dashboard', true);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Create account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" type="text" value={name} onInput={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" value={email} onInput={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className="form-control" type="password" value={password} onInput={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>
        <p className="mt-3">Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );
}
