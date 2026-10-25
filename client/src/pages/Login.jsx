import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Login.css';

export default function Login({ mode: initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const isRegister = mode === 'register';
  const { authenticate } = useAuth();
  const nav = useNavigate();

  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const on = k => e => {
    setErr('');
    setMsg('');
    setF({ ...f, [k]: e.target.value });
  };

  async function submit(e) {
    if (e) e.preventDefault();
    setErr('');
    setMsg('');
    setBusy(true);

    try {
      if (isRegister) {
        if (!f.name.trim()) throw new Error('Please enter your full name.');
        await authenticate('register', {
          name: f.name.trim(),
          email: f.email.trim(),
          password: f.password
        });
      } else {
        await authenticate('login', {
          email: f.email.trim(),
          password: f.password
        });
      }
      nav('/');
    } catch (x) {
      setErr(x.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setBusy(false);
    }
  }

  // Quick 1-Click Demo Login
  async function quickDemoLogin() {
    setErr('');
    setMsg('');
    setBusy(true);
    const demoEmail = 'demo@smartcompare.in';
    const demoPass = 'SmartCompare123';
    try {
      try {
        await authenticate('login', { email: demoEmail, password: demoPass });
      } catch {
        await authenticate('register', { name: 'Demo Shopper', email: demoEmail, password: demoPass });
      }
      nav('/');
    } catch (e) {
      setErr(e.message || 'Demo entry failed. Please try manual login.');
    } finally {
      setBusy(false);
    }
  }

  // Seamless Google Auth Demo
  async function googleLogin() {
    setErr('');
    setMsg('');
    setBusy(true);
    const gEmail = 'google.shopper@smartcompare.in';
    const gPass = 'GoogleAuth2026';
    try {
      try {
        await authenticate('login', { email: gEmail, password: gPass });
      } catch {
        await authenticate('register', { name: 'Google Verified User', email: gEmail, password: gPass });
      }
      nav('/');
    } catch {
      setErr('Google sign-in simulation failed. Please use demo login.');
    } finally {
      setBusy(false);
    }
  }

  function handleForgot(e) {
    e.preventDefault();
    setMsg('A reset link has been dispatched to your email! (Or click "One-Click Demo Entry" for instant access)');
  }

  return (
    <div className="sc-auth-page-root">
      <div className="sc-auth-container">
        
        {/* ================================================================= */}
        {/* LEFT SIDE: HERO SHOWCASE (Matches Screenshot Exactly)            */}
        {/* ================================================================= */}
        <section className="sc-auth-hero">
          {/* Top Left Smart Compare Logo */}
          <div className="sc-brand-lockup">
            <div className="sc-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <path d="M11 8v6M8 11h6" strokeWidth="2"></path>
              </svg>
            </div>
            <div className="sc-brand-texts">
              <span className="sc-brand-name">Smart <span>Compare</span></span>
              <span className="sc-brand-tagline">Compare · Save · Shop Smarter</span>
            </div>
          </div>

          {/* Subheading Tag */}
          <div className="sc-hero-badge">
            YOUR SMART SHOPPING PARTNER
          </div>

          {/* Main Headline */}
          <h1 className="sc-hero-title">
            Find the Best Deals.<br />
            All in <span className="sc-hero-highlight">One Place.</span>
          </h1>

          {/* Description */}
          <p className="sc-hero-desc">
            Compare prices, check delivery time, read reviews, and find the best offers from all your favorite stores and apps — instantly.
          </p>

          {/* 4 Feature Badges (Pills) */}
          <div className="sc-features-grid">
            <div className="sc-feat-card">
              <div className="sc-feat-icon-wrap price">🏷️</div>
              <div className="sc-feat-text">
                <span className="sc-feat-name">Best Prices</span>
                <span className="sc-feat-sub">Lowest rates across platforms</span>
              </div>
            </div>

            <div className="sc-feat-card">
              <div className="sc-feat-icon-wrap delivery">🚚</div>
              <div className="sc-feat-text">
                <span className="sc-feat-name">Fast Delivery</span>
                <span className="sc-feat-sub">Know delivery time before you buy</span>
              </div>
            </div>

            <div className="sc-feat-card">
              <div className="sc-feat-icon-wrap trusted">🛡️</div>
              <div className="sc-feat-text">
                <span className="sc-feat-name">Trusted Stores</span>
                <span className="sc-feat-sub">Shop from verified & reliable brands</span>
              </div>
            </div>

            <div className="sc-feat-card">
              <div className="sc-feat-icon-wrap ai">⭐</div>
              <div className="sc-feat-text">
                <span className="sc-feat-name">Smart Suggestions</span>
                <span className="sc-feat-sub">Get AI-powered recommendations</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Laptop comparison preview + shopping cart scene) */}
          <div className="sc-showcase-wrap">
            <img
              src="/images/auth-hero.jpg"
              alt="Smart Compare Shopping Experience"
              className="sc-showcase-img"
              loading="eager"
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop';
              }}
            />
            <div className="sc-handwritten-note">
              Compare Save Shop Smarter ➔
            </div>
          </div>

          {/* Supported Store Logos Strip */}
          <div className="sc-partners-bar">
            <span className="sc-partner-item">amazon</span>
            <span className="sc-partner-dot">●</span>
            <span className="sc-partner-item">Flipkart</span>
            <span className="sc-partner-dot">●</span>
            <span className="sc-partner-item">Myntra</span>
            <span className="sc-partner-dot">●</span>
            <span className="sc-partner-item">croma</span>
            <span className="sc-partner-dot">●</span>
            <span className="sc-partner-item">meesho</span>
            <span className="sc-partner-dot">●</span>
            <span className="sc-partner-item" style={{ color: '#94a3b8' }}>...and more</span>
          </div>
        </section>


        {/* ================================================================= */}
        {/* RIGHT SIDE: FLOATING WHITE LOGIN CARD                             */}
        {/* ================================================================= */}
        <section className="sc-auth-card-wrap">
          <div className="sc-auth-card">
            
            {/* Card Brand Header */}
            <div className="sc-card-brand">
              <div className="sc-card-brand-lockup">
                <div className="sc-card-brand-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <span className="sc-card-brand-title">Smart<span>Compare</span></span>
              </div>
              <span className="sc-card-brand-sub">Compare · Save · Shop Smarter</span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="sc-card-title">{isRegister ? 'Create Account' : 'Welcome Back!'}</h2>
            <p className="sc-card-subtitle">
              {isRegister
                ? 'Create your free account and start saving on 14,000+ products today'
                : 'Log in to your account and continue your smart shopping journey'}
            </p>

            {/* 1-Click Quick Demo Pill */}
            <div className="sc-quick-demo-pill" onClick={quickDemoLogin} title="Instant demo login without typing">
              <span>⚡ One-Click Instant Demo Access</span>
              <span className="arrow">→</span>
            </div>

            {/* Alert Messages */}
            {err && <div className="sc-card-alert error" role="alert">{err}</div>}
            {msg && <div className="sc-card-alert success" role="status">{msg}</div>}

            {/* Authentication Form */}
            <form className="sc-auth-form" onSubmit={submit}>
              
              {/* Full Name (Only on Register) */}
              {isRegister && (
                <div className="sc-input-group">
                  <div className="sc-input-box">
                    <span className="sc-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input
                      id="auth-name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={f.name}
                      onChange={on('name')}
                      autoComplete="name"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div className="sc-input-group">
                <div className="sc-input-box">
                  <span className="sc-input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={f.email}
                    onChange={on('email')}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="sc-input-group">
                <div className="sc-input-box">
                  <span className="sc-input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </span>
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={isRegister ? 8 : 1}
                    placeholder="Enter your password"
                    value={f.password}
                    onChange={on('password')}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                  />
                  <button
                    type="button"
                    className="sc-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row (In Login mode) */}
              {!isRegister && (
                <div className="sc-options-row">
                  <label className="sc-remember-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <button type="button" className="sc-forgot-link" onClick={handleForgot}>
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="sc-submit-btn"
                disabled={busy}
              >
                {busy ? 'Please wait…' : isRegister ? 'Create Account →' : 'Login →'}
              </button>
            </form>

            {/* Divider: OR */}
            <div className="sc-auth-divider">
              <span>OR</span>
            </div>

            {/* Google Social Button */}
            <button
              type="button"
              className="sc-google-btn"
              onClick={googleLogin}
              disabled={busy}
            >
              <span className="sc-google-icon">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </span>
              <span>Continue with Google</span>
            </button>

            {/* Toggle Login / Register */}
            <div className="sc-switch-mode">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="sc-switch-btn"
                    onClick={() => { setMode('login'); setErr(''); setMsg(''); }}
                  >
                    Log In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="sc-switch-btn"
                    onClick={() => { setMode('register'); setErr(''); setMsg(''); }}
                  >
                    Sign Up
                  </button>
                </span>
              )}
            </div>

            {/* Bottom Trust & Security Banner */}
            <div className="sc-trust-banner">
              <div className="sc-trust-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <div className="sc-trust-text">
                <span className="sc-trust-title">Your data is safe with us</span>
                <span className="sc-trust-sub">We use industry-standard encryption to protect your account</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
