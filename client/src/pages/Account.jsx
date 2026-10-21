import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, money } from '../services/api.js';
import { useCompare } from '../context/CompareContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

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

  return (
    <div>
      <div className="alerts-toolbar">
        <button
          type="button"
          className="btn-refresh-alerts"
          onClick={handleCheckNow}
          disabled={checking}
        >
          {checking ? 'Checking…' : '🔄 Check Prices Now'}
        </button>
        {s.data.alerts.some(a => a.status === 'active') && (
          <button
            type="button"
            className="btn-test-alarm"
            onClick={() => {
              const active = s.data.alerts.find(a => a.status === 'active');
              if (active) handleSimulateDrop(active.productId);
            }}
          >
            ⚡ Test Alarm (Simulate Price Drop)
          </button>
        )}
      </div>

      {statusMsg && <div className="alarm-status-banner triggered" role="status" style={{ marginBottom: '1rem' }}>{statusMsg}</div>}

      {s.data.alerts.length === 0 ? (
        <div className="empty">No price alarms set yet. Open any product and set your target price to start receiving alerts!</div>
      ) : (
        <div className="alerts-list">
          {s.data.alerts.map(a => (
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
      )}
    </div>
  );
}

function Notifications({ onReloadTrigger }) {
  const [s, reload] = useLoad(api.notifications, onReloadTrigger);
  if (!s.data) return <Err s={s} />;
  return s.data.notifications.length === 0 ? (
    <div className="empty">No alarm notifications yet. As soon as a product price drops to your target, you will see it here!</div>
  ) : (
    <div className="notifications-list">
      {s.data.notifications.map(n => (
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
    <div className="wrap">
      <h2>🔔 Price Alarms & Target Alerts</h2>
      <p style={{ color: 'var(--mut)', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
        Track target prices for any product. When prices reach or drop below your target price, an instant notification is sent to you!
      </p>
      <Alerts onNotificationTriggered={handleNotifTrigger} />
      <h3 style={{ marginTop: '2.5rem' }}>🔔 Alarm Notifications</h3>
      <Notifications onReloadTrigger={notifTrigger} />
    </div>
  );
  return <div className="wrap"><h2>Dashboard</h2><Profile />
    <h3>Notifications</h3><Notifications onReloadTrigger={notifTrigger} /><h3>Wishlist</h3><Wishlist /><h3>Price alerts</h3><Alerts onNotificationTriggered={handleNotifTrigger} /><h3>Saved comparisons</h3><SavedComparisons /><h3>Recently viewed</h3><Recent /></div>;
}
