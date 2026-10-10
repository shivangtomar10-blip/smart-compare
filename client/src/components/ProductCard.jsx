import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api, money } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';

export default function ProductCard({ product: p }) {
  const best = p.lowestOffer, { user } = useAuth(), cmp = useCompare(), nav = useNavigate();
  const [msg, setMsg] = useState('');
  async function save() {
    if (!user) return nav('/login');
    try { await api.addWish({ productId: p.id, title: p.title, image: best.image, lastPrice: best.price, currency: best.currency }); setMsg('Saved ✓'); }
    catch (e) { setMsg(e.status === 409 ? 'Already saved' : e.message); }
  }
  return (
    <article className="card prod">
      {best.image ? <img src={best.image} alt="" loading="lazy" /> : <div className="noimg">No image</div>}
      <h3><Link to={`/product/${p.id}`}>{p.title}</Link></h3>
      {best.isDemo && <span className="badge">SAMPLE DATA – not a live price</span>}
      <div className="price">{money(best.price, best.currency)} <small>lowest listed</small></div>
      {p.maxSavings > 0 && <div className="save">Save up to {money(p.maxSavings, best.currency)} across {p.offers.length} sellers</div>}
      <ul className="offers">{p.offers.slice(0, 4).map(o => (
        <li key={o.url}><span>{o.seller}</span><b>{money(o.price, o.currency)}</b>
          <a href={o.url} target="_blank" rel="noopener noreferrer sponsored">View</a></li>))}</ul>
      <div className="acts">
        <button className="ghost" onClick={save}>♡ Save</button>
        <button className={cmp.has(p.id) ? 'ghost on' : 'ghost'} disabled={!cmp.has(p.id) && cmp.full} onClick={() => cmp.toggle(p.id)}>{cmp.has(p.id) ? '✓ Comparing' : '+ Compare'}</button>
      </div>
      {msg && <small role="status">{msg}</small>}
      <small className="upd">Updated {new Date(best.fetchedAt).toLocaleString()}</small>
    </article>
  );
}
