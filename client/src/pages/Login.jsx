import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login({ mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const reg = mode === 'register';
  const { authenticate } = useAuth();
  const nav = useNavigate();

  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const on = k => e => {
    setErr('');
    setF({ ...f, [k]: e.target.value });
  };

  async function submit(e) {
    if (e) e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      if (reg) {
        await authenticate('register', { name: f.name.trim(), email: f.email.trim(), password: f.password });
      } else {
        await authenticate('login', { email: f.email.trim(), password: f.password });
      }
      nav('/');
    } catch (x) {
      setErr(x.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setBusy(false);
    }
  }

  // Quick 1-click Demo Entry for effortless instant access
  async function quickDemoLogin() {
    setErr('');
    setBusy(true);
    const demoEmail = 'demo@smartcompare.in';
    const demoPass = 'SmartCompare123';
    try {
      // First try to login
      try {
        await authenticate('login', { email: demoEmail, password: demoPass });
      } catch (loginErr) {
        // If demo user does not exist yet, register it automatically
        await authenticate('register', { name: 'Demo User', email: demoEmail, password: demoPass });
      }
      nav('/');
    } catch (e) {
      setErr(e.message || 'Quick demo entry failed. Please register a new account below.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-gateway-wrap">
      <div className="auth-gateway-card">
        {/* Brand Banner */}
        <div className="auth-brand-head">
          <div className="auth-logo">Smart<span>Compare</span></div>
          <h2>{reg ? 'Create Account to Enter' : 'Welcome! Please Sign In'}</h2>
          <p className="auth-sub">
            {reg
              ? 'Create a new account to enter and compare real prices across all shopping apps.'
              : 'Sign in to access the platform, or enter instantly using the One-Click Demo.'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        <div className="auth-quick-demo-box">
          <button
            type="button"
            className="auth-btn-quick-demo"
            onClick={quickDemoLogin}
            disabled={busy}
          >
            ⚡ One-Click Demo Entry (Instant Access) →
          </button>
          <small className="auth-demo-hint">Instant access with pre-configured demo account</small>
        </div>

        <div className="auth-divider">
          <span>OR USE YOUR ACCOUNT</span>
        </div>

        {/* Mode Switch Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!reg ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErr(''); }}
          >
            🔑 Log In
          </button>
          <button
            type="button"
            className={`auth-tab ${reg ? 'active' : ''}`}
            onClick={() => { setMode('register'); setErr(''); }}
          >
            📝 Register
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={submit}>
          {reg && (
            <div className="auth-field">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                required
                minLength="2"
                placeholder="e.g. John Doe"
                value={f.name}
                onChange={on('name')}
                autoComplete="name"
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              required
              placeholder="e.g. yourname@gmail.com"
              value={f.email}
              onChange={on('email')}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              required
              minLength={reg ? 8 : 1}
              placeholder={reg ? 'Minimum 8 characters (letters + numbers)' : 'Enter your password'}
              value={f.password}
              onChange={on('password')}
              autoComplete={reg ? 'new-password' : 'current-password'}
            />
            {reg && <small className="auth-hint">Must have at least 8 characters with a letter and a number (e.g. Rahul123).</small>}
          </div>

          {err && <div className="alert" role="alert" style={{ margin: '0.8rem 0' }}>{err}</div>}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={busy}
          >
            {busy ? 'Please wait…' : reg ? '✨ Create Account & Enter Website →' : '🚀 Log In & Enter Website →'}
          </button>
        </form>

        {/* Features highlight bar */}
        <div className="auth-features-bar">
          <div className="auth-feat-item">✓ Flipkart & Amazon Live Prices</div>
          <div className="auth-feat-item">✓ 1-Click Meesho & Myntra Check</div>
          <div className="auth-feat-item">✓ Price Alarm Notifications</div>
        </div>
      </div>
    </div>
  );
}
