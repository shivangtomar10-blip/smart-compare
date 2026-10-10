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
      <span>{i.lastPrice != null && `${money(i.lastPrice, i.currency || 'USD')} when saved`}</span>
      <button className="ghost" onClick={() => api.removeWish(i.productId).then(reload)}>Remove</button></li>)}</ul>;
}
function Alerts() {
  const [s, reload] = useLoad(api.alerts);
  if (!s.data) return <Err s={s} />;
  return s.data.alerts.length === 0 ? <div className="empty">No price alerts. Open a product to create one.</div> :
    <ul className="rows">{s.data.alerts.map(a => <li key={a.id}><Link to={`/product/${a.productId}`}>{a.title}</Link>
      <span>Target {money(a.targetPrice, a.currency)} · {a.status === 'triggered' ? `reached at ${money(a.triggeredPrice, a.currency)}` : 'watching'}</span>
      <button className="ghost" onClick={() => api.deleteAlert(a.id).then(reload)}>Delete</button></li>)}</ul>;
}
function Notifications() {
  const [s, reload] = useLoad(api.notifications);
  if (!s.data) return <Err s={s} />;
  return s.data.notifications.length === 0 ? <div className="empty">No notifications.</div> :
    <ul className="rows">{s.data.notifications.map(n => <li key={n.id} style={{ fontWeight: n.read ? 400 : 700 }}>
      <span style={{ flex: 1 }}>{n.message} {n.url && <a href={n.url} target="_blank" rel="noopener noreferrer">View</a>}</span>
      {!n.read && <button className="ghost" onClick={() => api.markRead(n.id).then(reload)}>Mark read</button>}</li>)}</ul>;
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
  if (view === 'wishlist') return <div className="wrap"><h2>Wishlist</h2><Wishlist /></div>;
  if (view === 'alerts') return <div className="wrap"><h2>Price alerts</h2><Alerts /><h3>Notifications</h3><Notifications /></div>;
  return <div className="wrap"><h2>Dashboard</h2><Profile />
    <h3>Notifications</h3><Notifications /><h3>Wishlist</h3><Wishlist /><h3>Price alerts</h3><Alerts /><h3>Saved comparisons</h3><SavedComparisons /><h3>Recently viewed</h3><Recent /></div>;
}
