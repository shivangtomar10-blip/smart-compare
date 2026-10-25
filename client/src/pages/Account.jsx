import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, money } from '../services/api.js';
import { useCompare } from '../context/CompareContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './Alerts.css';

function useLoad(fn, key = '') {
  const [s, setS] = useState({ data: null, err: '' });
  const reload = () => fn().then(data => setS({ data, err: '' })).catch(e => setS({ data: null, err: e.message }));
  useEffect(() => { reload(); }, [key]);
  return [s, reload];
}

const Err = ({ s }) => s.err ? <div className="alert" role="alert">{s.err}</div> : !s.data ? <div className="card skel" /> : null;

function Wishlist() {
  const [s, reload] = useLoad(api.wishlist);
  if (!s.data) return <Err s={s} />;
  return s.data.items.length === 0 ? <div className="empty">No saved products yet.</div> :
    <ul className="rows">{s.data.items.map(i => <li key={i.productId}><Link to={`/product/${i.productId}`}>{i.title}</Link>
      <span>{i.lastPrice != null && `${money(i.lastPrice, i.currency || 'INR')} when saved`}</span>
      <button className="ghost" onClick={() => api.removeWish(i.productId).then(reload)}>Remove</button></li>)}</ul>;
}

function AlertsHero({ onCheck, onTest, checking, hasActiveAlerts }) {
  return (
    <div className="alerts-hero-card">
      <div className="alerts-hero-grid">
        {/* Left Column */}
        <div className="alerts-hero-left">
          <div className="alerts-title-row">
            <div className="alerts-bell-badge">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21A2 2 0 0 1 10.27 21" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="alerts-hero-title">
              Price Alarms <span>& Target Alerts</span>
            </h1>
          </div>

          <p className="alerts-hero-desc">
            Track target prices for any product. When prices reach or drop below your target price, an instant notification is sent to you!
          </p>

          <div className="alerts-action-bar">
            <button
              type="button"
              className="btn-check-prices-pill"
              onClick={onCheck}
              disabled={checking}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M23 4V10H17" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 20V14H7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.51 9A9 9 0 0 1 18.36 5.64L23 10M1 14L5.64 18.36A9 9 0 0 0 20.49 15" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{checking ? 'Checking Prices…' : 'Check Prices Now'}</span>
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>›</span>
            </button>

            {hasActiveAlerts && (
              <button
                type="button"
                className="btn-simulate-test"
                onClick={onTest}
                title="Simulate price drop below target to trigger instant alert"
              >
                <span>⚡ Test Alarm (Simulate Drop)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: 3D Illustration Graphic */}
        <div className="alerts-hero-right">
          <div className="alerts-img-frame">
            <img
              src="/images/alerts-hero.jpg"
              alt="Price Drop Alert 3D Experience"
              className="alerts-hero-img"
            />
          </div>
        </div>
      </div>

      {/* 4 Feature Pills Strip */}
      <div className="alerts-features-row">
        <div className="alert-feat-card">
          <div className="feat-circle-icon tag">🏷️</div>
          <div className="feat-text-wrap">
            <h4>Set Target Price</h4>
            <p>Choose your desired price for any product.</p>
          </div>
        </div>

        <div className="alert-feat-card">
          <div className="feat-circle-icon bell">🔔</div>
          <div className="feat-text-wrap">
            <h4>Get Instant Alerts</h4>
            <p>Receive notifications when price drops or reaches your target.</p>
          </div>
        </div>

        <div className="alert-feat-card">
          <div className="feat-circle-icon chart">📊</div>
          <div className="feat-text-wrap">
            <h4>Track in Real-time</h4>
            <p>Stay updated with live price changes.</p>
          </div>
        </div>

        <div className="alert-feat-card">
          <div className="feat-circle-icon save">🛡️</div>
          <div className="feat-text-wrap">
            <h4>Save More</h4>
            <p>Never miss a deal again!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Alerts({ onNotificationTriggered }) {
  const [s, reload] = useLoad(api.alerts);
  const [checking, setChecking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleCheckNow = async () => {
    setChecking(true);
    setStatusMsg('');
    try {
      const res = await api.checkAlerts();
      reload();
      if (onNotificationTriggered) onNotificationTriggered();
      setStatusMsg(`Checked ${res.summary.checked} active alarms. ${res.summary.triggered} price drop alarms triggered!`);
    } catch (e) {
      setStatusMsg(`Check error: ${e.message}`);
    } finally {
      setChecking(false);
    }
  };

  const handleSimulateDrop = async (productId) => {
    try {
      const res = await api.simulateDrop(productId, 20);
      reload();
      if (onNotificationTriggered) onNotificationTriggered();
      setStatusMsg(`⚡ Price drop simulated! Price dropped from ₹${res.oldPrice} to ₹${res.newPrice}. Alarm triggered!`);
    } catch (e) {
      setStatusMsg(`Simulation error: ${e.message}`);
    }
  };

  if (!s.data) return <Err s={s} />;

  const activeAlerts = s.data.alerts || [];
  const hasActive = activeAlerts.some(a => a.status === 'active');

  const handleFirstTest = () => {
    const active = activeAlerts.find(a => a.status === 'active') || activeAlerts[0];
    if (active) handleSimulateDrop(active.productId);
  };

  return (
    <div>
      {/* Hero Banner Component */}
      <AlertsHero
        onCheck={handleCheckNow}
        onTest={handleFirstTest}
        checking={checking}
        hasActiveAlerts={hasActive}
      />

      {statusMsg && (
        <div className="alarm-status-banner triggered" role="status">
          <span>✓</span>
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Active Alerts List (If any alerts exist) */}
      {activeAlerts.length > 0 && (
        <div className="active-alerts-section">
          <div className="section-title-wrap">
            <h3 className="section-main-heading">
              <span>🎯</span>
              <span>Active Price Alarms ({activeAlerts.length})</span>
            </h3>
          </div>
          <div className="alerts-list">
            {activeAlerts.map(a => (
              <div key={a.id} className="alert-item-card">
                <img
                  src={a.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop'}
                  alt={a.title}
                  className="alert-item-thumb"
                  onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&auto=format&fit=crop'; }}
                />
                <div className="alert-item-info">
                  <div className="alert-item-title">
                    <Link to={`/product/${a.productId}`}>{a.title}</Link>
                  </div>
                  <div className="alert-item-meta">
                    <span>Target: <b>{money(a.targetPrice, a.currency)}</b></span>
                    {a.status === 'triggered' ? (
                      <span className="badge-triggered">🎉 Price Reached at {money(a.triggeredPrice, a.currency)}!</span>
                    ) : (
                      <span className="badge-watching">⏳ Watching Price</span>
                    )}
                    {a.createdAt && (
                      <span style={{ color: 'var(--mut)', fontSize: '0.75rem' }}>
                        Set on {new Date(a.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="alert-item-actions">
                  {a.status === 'active' && (
                    <button
                      type="button"
                      className="ghost"
                      style={{ background: '#fef3c7', borderColor: '#fde68a', color: '#92400e', fontWeight: 600 }}
                      onClick={() => handleSimulateDrop(a.productId)}
                      title="Simulate price drop below target to test notification"
                    >
                      ⚡ Test Trigger
                    </button>
                  )}
                  <Link to={`/product/${a.productId}`} className="ghost" style={{ textDecoration: 'none' }}>
                    View
                  </Link>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => api.deleteAlert(a.id).then(reload)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Notifications({ onReloadTrigger }) {
  const [s, reload] = useLoad(api.notifications, onReloadTrigger);
  if (!s.data) return <Err s={s} />;

  const notifs = s.data.notifications || [];

  return (
    <div className="notifications-section">
      {/* Section Header */}
      <div className="section-title-wrap">
        <div>
          <h2 className="section-main-heading">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb">
              <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21A2 2 0 0 1 10.27 21" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Alarm Notifications</span>
          </h2>
          <p className="section-subtext">
            No alarm notifications yet. As soon as a product price drops to your target, you will see it here!
          </p>
        </div>
        <Link to="/alerts" className="btn-manage-pill">
          <span>Manage Alerts</span>
          <span>→</span>
        </Link>
      </div>

      {/* Empty State vs List */}
      {notifs.length === 0 ? (
        <div className="empty-state-modern-card">
          <div className="empty-bell-icon-badge">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21A2 2 0 0 1 10.27 21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="empty-state-heading">No Alarm Notifications Yet!</h3>
          <p className="empty-state-sub">
            Set price alerts for your favorite products and get notified when the price drops.
          </p>
          <Link to="/search?q=popular" className="btn-explore-gradient">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="7" strokeWidth="2.2" />
              <line x1="16" y1="16" x2="21" y2="21" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span>Explore Products</span>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>›</span>
          </Link>
        </div>
      ) : (
        <div className="notifications-list">
          {notifs.map(n => (
            <div key={n.id} className={`notif-card ${n.read ? '' : 'unread'}`}>
              <div className="notif-icon">🔔</div>
              <div className="notif-body">
                <div className="notif-msg" style={{ fontWeight: n.read ? 500 : 700 }}>
                  {n.message}
                </div>
                <div className="notif-time">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="notif-actions">
                {n.url && (
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ghost"
                    style={{ background: 'var(--blue)', color: '#fff', border: 0, textDecoration: 'none', fontWeight: 700, padding: '0.4rem 0.9rem' }}
                  >
                    🛒 View Deal
                  </a>
                )}
                {!n.read && (
                  <button className="ghost" onClick={() => api.markRead(n.id).then(reload)}>
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SavedComparisons() {
  const [s, reload] = useLoad(api.comparisons), { replace } = useCompare(), nav = useNavigate();
  if (!s.data) return <Err s={s} />;
  return s.data.comparisons.length === 0 ? <div className="empty">No saved comparisons.</div> :
    <ul className="rows">{s.data.comparisons.map(c => <li key={c.id}><b>{c.name}</b><span>{c.items.map(i => i.title).join(' vs ')}</span>
      <button className="ghost" onClick={() => { replace(c.items.map(i => i.productId)); nav('/compare'); }}>Open</button>
      <button className="ghost" onClick={() => api.deleteComparison(c.id).then(reload)}>Delete</button></li>)}</ul>;
}

function Recent() {
  const [s] = useLoad(api.recent);
  if (!s.data) return <Err s={s} />;
  return s.data.items.length === 0 ? <div className="empty">Nothing viewed yet.</div> :
    <ul className="rows">{s.data.items.map(i => <li key={i.productId}><Link to={`/product/${i.productId}`}>{i.title}</Link></li>)}</ul>;
}

function Profile() {
  const { user, setUser } = useAuth(), [name, setName] = useState(user.name), [msg, setMsg] = useState('');
  const save = async e => { e.preventDefault(); try { setUser((await api.updateMe(name)).user); setMsg('Profile updated'); } catch (x) { setMsg(x.message); } };
  return <form onSubmit={save} className="filters"><label>Name<input value={name} onChange={e => setName(e.target.value)} minLength="2" required /></label>
    <span>{user.email}</span><button className="ghost">Save</button>{msg && <small role="status">{msg}</small>}</form>;
}

export default function Account({ view = 'dashboard' }) {
  const [notifTrigger, setNotifTrigger] = useState(0);
  const handleNotifTrigger = () => setNotifTrigger(t => t + 1);

  if (view === 'wishlist') return <div className="wrap"><h2>Wishlist</h2><Wishlist /></div>;
  if (view === 'alerts') return (
    <div className="alerts-page-wrap">
      <Alerts onNotificationTriggered={handleNotifTrigger} />
      <Notifications onReloadTrigger={notifTrigger} />
    </div>
  );
  return (
    <div className="wrap">
      <h2>Dashboard</h2>
      <Profile />
      <h3>Notifications</h3>
      <Notifications onReloadTrigger={notifTrigger} />
      <h3>Wishlist</h3>
      <Wishlist />
      <h3>Price alerts</h3>
      <Alerts onNotificationTriggered={handleNotifTrigger} />
      <h3>Saved comparisons</h3>
      <SavedComparisons />
      <h3>Recently viewed</h3>
      <Recent />
    </div>
  );
}
