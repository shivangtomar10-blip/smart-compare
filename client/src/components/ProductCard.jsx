import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api, money } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';
export default function ProductCard({ product: p }) {
  if (!p) return null;
  const offers = Array.isArray(p.offers) ? p.offers : [];
  const best = p.lowestOffer || offers[0] || { price: 0, currency: 'INR', seller: 'Store', image: p.image };
  const { user } = useAuth(), cmp = useCompare(), nav = useNavigate();
  const [msg, setMsg] = useState('');
  async function save() {
    if (!user) return nav('/login');
    try { await api.addWish({ productId: p.id, title: p.title, image: best.image, lastPrice: best.price, currency: best.currency }); setMsg('Saved ✓'); }
    catch (e) { setMsg(e.status === 409 ? 'Already saved' : e.message); }
  }

  const discountPercent = best.originalPrice && best.originalPrice > best.price
    ? Math.round((1 - best.price / best.originalPrice) * 100)
    : null;
  const sellerClean = (best.seller || 'store').toLowerCase().replace(/[^a-z]/g, '');

  const flipkartOffer = offers.find(o => o.seller.toLowerCase().includes('flipkart'));

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
        {flipkartOffer ? (
          <span className="seller-pill seller-flipkart" title="Flipkart Price">
            Flipkart: {money(flipkartOffer.price, flipkartOffer.currency)}
          </span>
        ) : (
          <span className={`seller-pill seller-${sellerClean}`}>
            {best.seller || 'Store'}
          </span>
        )}
        <span className="badge-live-real">✓ Live Real Price</span>
      </div>

      <h3><Link to={`/product/${p.id}`} title={p.title}>{p.title}</Link></h3>

      <div className="price-row">
        <span className="price-main">{money(flipkartOffer ? flipkartOffer.price : best.price, best.currency)}</span>
        <span className="price-source-tag">on Flipkart</span>
        {best.originalPrice && best.originalPrice > (flipkartOffer ? flipkartOffer.price : best.price) && (
          <span className="price-mrp">{money(best.originalPrice, best.currency)}</span>
        )}
      </div>

      {best.seller && !best.seller.toLowerCase().includes('flipkart') && best.price < (flipkartOffer ? flipkartOffer.price : best.price) ? (
        <div className="save">
          Lowest on {best.seller} at {money(best.price, best.currency)} (Save {money((flipkartOffer ? flipkartOffer.price : best.price) - best.price, best.currency)} vs Flipkart)
        </div>
      ) : p.maxSavings > 0 ? (
        <div className="save">Save up to {money(p.maxSavings, best.currency)} across {offers.length} stores</div>
      ) : null}

      <ul className="offers">
        {offers.slice(0, 3).map(o => (
          <li key={o.url}>
            <span>{o.seller}</span>
            <b>{money(o.price, o.currency)}</b>
            <a href={o.smartUrl || o.url} target="_blank" rel="noopener noreferrer sponsored">View ↗</a>
          </li>
        ))}
      </ul>

      {/* Quick direct links to all verified sellers with live prices */}
      <div className="app-compare-links">
        <span className="app-compare-label">Stores:</span>
        {(() => {
          const sortedOffers = [...offers].sort((a, b) => {
            const aIsFk = a.seller.toLowerCase().includes('flipkart');
            const bIsFk = b.seller.toLowerCase().includes('flipkart');
            if (aIsFk && !bIsFk) return -1;
            if (!aIsFk && bIsFk) return 1;
            return a.price - b.price;
          });
          return sortedOffers.map(o => {
            const sellerKey = o.seller.toLowerCase().replace(/[^a-z]/g, '');
            const label = o.seller.replace(' India', '');
            return (
              <a
                key={o.url}
                href={o.smartUrl || o.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`app-mini-btn ${sellerKey}`}
                title={`Open exact item on ${o.seller} (${money(o.price, o.currency)})`}
              >
                {label} ({money(o.price, o.currency)}) ↗
              </a>
            );
          });
        })()}
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
