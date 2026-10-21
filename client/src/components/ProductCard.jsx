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

  const discountPercent = best.originalPrice && best.originalPrice > best.price
    ? Math.round((1 - best.price / best.originalPrice) * 100)
    : null;

  return (
    <article className="card prod">
      <div className="prod-img-wrap">
        <img
          src={p.image || best.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop'}
          alt={p.title}
          loading="eager"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop';
          }}
        />
        {discountPercent ? (
          <span className="card-badge-discount">{discountPercent}% OFF</span>
        ) : null}
      </div>

      <div className="seller-tag-row">
        <span className={`seller-pill seller-${best.seller.toLowerCase().replace(/[^a-z]/g, '')}`}>
          {best.seller}
        </span>
        <span className="badge-live-real">✓ Real Live Price</span>
      </div>

      <h3><Link to={`/product/${p.id}`} title={p.title}>{p.title}</Link></h3>

      <div className="price-row">
        <span className="price-main">{money(best.price, best.currency)}</span>
        {best.originalPrice && best.originalPrice > best.price && (
          <span className="price-mrp">{money(best.originalPrice, best.currency)}</span>
        )}
      </div>

      {p.maxSavings > 0 && <div className="save">Save up to {money(p.maxSavings, best.currency)} across {p.offers.length} sellers</div>}

      <ul className="offers">
        {p.offers.slice(0, 3).map(o => (
          <li key={o.url}>
            <span>{o.seller}</span>
            <b>{money(o.price, o.currency)}</b>
            <a href={o.url} target="_blank" rel="noopener noreferrer sponsored">View ↗</a>
          </li>
        ))}
      </ul>

      {/* Quick Compare across other popular shopping apps */}
      <div className="app-compare-links">
        <span className="app-compare-label">Apps:</span>
        <a href={`https://www.meesho.com/search?q=${encodeURIComponent(p.title)}`} target="_blank" rel="noopener noreferrer" className="app-mini-btn meesho" title="Check real price on Meesho App">Meesho ↗</a>
        <a href={`https://www.myntra.com/${encodeURIComponent(p.title)}`} target="_blank" rel="noopener noreferrer" className="app-mini-btn myntra" title="Check real price on Myntra App">Myntra ↗</a>
        {best.seller !== 'Amazon India' && (
          <a href={`https://www.amazon.in/s?k=${encodeURIComponent(p.title)}`} target="_blank" rel="noopener noreferrer" className="app-mini-btn amazon" title="Check real price on Amazon">Amazon ↗</a>
        )}
        {best.seller !== 'Flipkart' && (
          <a href={`https://www.flipkart.com/search?q=${encodeURIComponent(p.title)}`} target="_blank" rel="noopener noreferrer" className="app-mini-btn flipkart" title="Check real price on Flipkart">Flipkart ↗</a>
        )}
      </div>

      <div className="acts">
        <button className="ghost" onClick={save}>♡ Save</button>
        <button className={cmp.has(p.id) ? 'ghost on' : 'ghost'} disabled={!cmp.has(p.id) && cmp.full} onClick={() => cmp.toggle(p.id)}>{cmp.has(p.id) ? '✓ Comparing' : '+ Compare'}</button>
        <Link to={`/product/${p.id}#price-alarm`} className="ghost" style={{ textDecoration: 'none' }}>🔔 Alert</Link>
      </div>
      {msg && <small role="status">{msg}</small>}
      <small className="upd">Real Price on {best.seller} · {new Date(best.fetchedAt).toLocaleTimeString()}</small>
    </article>
  );
}
