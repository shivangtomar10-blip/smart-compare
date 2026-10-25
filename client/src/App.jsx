import { Routes, Route, Link, NavLink, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import Product from './pages/Product.jsx';
import Compare from './pages/Compare.jsx';
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import Info from './pages/Info.jsx';
import NotFound from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { useCompare } from './context/CompareContext.jsx';
import { api } from './services/api.js';

export function SearchBox({ big }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const submit = e => { e.preventDefault(); if (q.trim().length >= 2) nav(`/search?q=${encodeURIComponent(q.trim())}`); };
  return (
    <form onSubmit={submit} className={big ? 'sbox big' : 'sbox'} role="search">
      <input aria-label="Search products" value={q} onChange={e => setQ(e.target.value)} placeholder="Search phones, laptops, shoes…" />
      <button type="submit">Search</button>
    </form>
  );
}

function Protected({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <div className="wrap"><div className="card skel" /></div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user, ready, logout } = useAuth(), { ids } = useCompare(), loc = useLocation(), nav = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) { setUnread(0); return; }
    const check = () => api.notifications().then(d => setUnread(d.unread)).catch(() => {});
    check();
    const timer = setInterval(check, 8000);
    return () => clearInterval(timer);
  }, [user, loc.pathname]);

  if (!ready) {
    return (
      <div className="auth-loading-wrap">
        <div className="auth-loading-card">
          <div className="auth-logo">Smart<span>Compare</span></div>
          <div className="card skel" style={{ height: '80px', margin: '1.5rem 0' }} />
          <p style={{ color: 'var(--mut)', textAlign: 'center' }}>Connecting to SmartCompare...</p>
        </div>
      </div>
    );
  }

  // Mandatory Login / Register gatekeeper before entering the website
  if (!user) {
    return (
      <div className="auth-gateway-page">
        <Routes>
          <Route path="/register" element={<Login mode="register" />} />
          <Route path="*" element={<Login mode="login" />} />
        </Routes>
      </div>
    );
  }

  // Inside the website (unlocked after login or register)
  return (
    <>
      <header className="hdr">
        <Link to="/" className="brand-nav-link">
          <div className="brand-nav-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M16 11V7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7V11" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M5 9H19L20.2 21H3.8L5 9Z" fill="#ffffff" fillOpacity="0.25" stroke="#ffffff" strokeWidth="1.6" />
            </svg>
          </div>
          <div className="brand-nav-texts">
            <span className="brand-nav-title">Smart<span>Compare</span></span>
            <span className="brand-nav-subtitle">Compare • Save • Shop Smarter</span>
          </div>
        </Link>

        {loc.pathname !== '/' && <SearchBox />}

        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9L12 2L21 9V20C21 20.53 20.79 21.04 20.41 21.41C20.04 21.79 19.53 22 19 22H5C4.47 22 3.96 21.79 3.59 21.41C3.21 21.04 3 20.53 3 20V9Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12H15V22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Home</span>
          </NavLink>

          <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.64169 1.54871 7.04096 1.54871 8.5C1.54871 9.95904 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.12082 20.84 4.61Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Wishlist</span>
          </NavLink>

          <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21A2 2 0 0 1 10.27 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Alerts</span>
            <span className="nav-notif-pill">{unread > 0 ? unread : 1}</span>
          </NavLink>

          {ids.length > 0 && (
            <NavLink to="/compare" className={({ isActive }) => (isActive ? 'nav-item-link active' : 'nav-item-link')}>
              <span>Compare ({ids.length})</span>
            </NavLink>
          )}

          <NavLink to="/dashboard" className="nav-user-dropdown">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{user.name || user.email ? (user.name ? user.name.split(' ')[0] : user.email.split('@')[0]) : 'Account'}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 9L12 15L18 9" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </NavLink>

          <button className="nav-logout-btn" onClick={() => { logout(); nav('/'); }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="16 17 21 12 16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/price-history/:id" element={<Product />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/dashboard" element={<Account />} />
          <Route path="/wishlist" element={<Account view="wishlist" />} />
          <Route path="/alerts" element={<Account view="alerts" />} />
          <Route path="/about" element={<Info page="about" />} />
          <Route path="/contact" element={<Info page="contact" />} />
          <Route path="/privacy" element={<Info page="privacy" />} />
          <Route path="/terms" element={<Info page="terms" />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="ftr">© SmartCompare · <Link to="/about">About</Link> · <Link to="/contact">Contact</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></footer>
    </>
  );
}
