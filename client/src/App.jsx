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
  const { user, logout } = useAuth(), { ids } = useCompare(), loc = useLocation(), nav = useNavigate();
  const [unread, setUnread] = useState(0);
  useEffect(() => { if (user) api.notifications().then(d => setUnread(d.unread)).catch(() => {}); else setUnread(0); }, [user, loc.pathname]);
  return (
    <>
      <header className="hdr">
        <Link to="/" className="logo">Smart<span>Compare</span></Link>
        <SearchBox />
        <nav>
          <NavLink to="/compare">Compare{ids.length > 0 && ` (${ids.length})`}</NavLink>
          {user ? <>
            <NavLink to="/wishlist">Wishlist</NavLink>
            <NavLink to="/alerts" aria-label={`Alerts, ${unread} unread`}>Alerts{unread > 0 && <span className="dot">{unread}</span>}</NavLink>
            <NavLink to="/dashboard">{user.name.split(' ')[0]}</NavLink>
            <button className="linkbtn" onClick={() => { logout(); nav('/'); }}>Logout</button>
          </> : <><NavLink to="/login">Login</NavLink><NavLink to="/register">Register</NavLink></>}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/price-history/:id" element={<Product />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login mode="register" />} />
          <Route path="/dashboard" element={<Protected><Account /></Protected>} />
          <Route path="/wishlist" element={<Protected><Account view="wishlist" /></Protected>} />
          <Route path="/alerts" element={<Protected><Account view="alerts" /></Protected>} />
          <Route path="/about" element={<Info page="about" />} />
          <Route path="/contact" element={<Info page="contact" />} />
          <Route path="/privacy" element={<Info page="privacy" />} />
          <Route path="/terms" element={<Info page="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="ftr">© SmartCompare · <Link to="/about">About</Link> · <Link to="/contact">Contact</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></footer>
    </>
  );
}
