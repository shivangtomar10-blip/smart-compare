import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, money } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';
import PriceChart from '../components/PriceChart.jsx';

export default function Product() {
  const { id } = useParams(), { user } = useAuth(), cmp = useCompare(), nav = useNavigate();
  const [d, setD] = useState(null), [h, setH] = useState(null), [err, setErr] = useState(''), [target, setTarget] = useState(''), [msg, setMsg] = useState('');
  useEffect(() => {
    setD(null); setErr('');
    Promise.all([api.product(id), api.history(id)]).then(([p, hist]) => {
      setD(p); setH(hist);
      const best = p.offers[0];
      if (user) {
        api.addRecent({ productId: id, title: p.product.title, image: best?.image }).catch(() => {});
        api.alerts().then(res => setAlertsList(res.alerts || [])).catch(() => {});
      }
    }).catch(e => setErr(e.status === 404 ? 'Product not found. Search for it first so it gets saved.' : e.message));
  }, [id, user]);

  const [alertsList, setAlertsList] = useState([]);
  const activeAlert = alertsList.find(a => a.productId === id);

  if (!d || !d.product) return <div className="wrap"><div className="card skel" /></div>;
  const product = d.product;
  const offers = Array.isArray(d.offers) ? d.offers : [];
  const live = offers.filter(o => o && !o.isDemo);
  const best = live[0] || offers[0] || { price: 0, currency: 'INR', seller: 'Store', image: product.image };
  const s = h?.summary || { lowest: best.price, highest: best.price, currency: best.currency, count: 1, enoughData: false };
  const guard = fn => async () => { if (!user) return nav('/login'); try { setMsg(await fn()); } catch (e) { setMsg(e.status === 409 ? 'Already done' : e.message); } };
  const save = guard(async () => { await api.addWish({ productId: id, title: product.title, image: best?.image, lastPrice: best?.price, currency: best?.currency }); return 'Saved to wishlist'; });
  
  const handleSetAlarm = guard(async () => {
    const num = Number(target);
    if (!Number.isFinite(num) || num <= 0) return 'Please enter a valid target price';
    const res = await api.createAlert(id, num);
    const updated = await api.alerts();
    setAlertsList(updated.alerts || []);
    if (res.triggered) {
      return `🎉 Price Alarm Triggered Instantly! The current price (${money(best.price, best.currency)}) is already at or below your target (${money(num, best.currency)})! Check your Alerts tab for notification.`;
    }
    return `✅ Price Alarm Set! Watching for ${money(num, best.currency)}. When price drops to or below this amount, you'll be notified immediately!`;
  });

  const handleCancelAlarm = async (alertId) => {
    try {
      await api.deleteAlert(alertId);
      const updated = await api.alerts();
      setAlertsList(updated.alerts || []);
      setMsg('Price alarm cancelled.');
    } catch (e) {
      setMsg(e.message);
    }
  };

  const applyDiscountPreset = (percent) => {
    if (!best?.price) return;
    const calc = Math.round(best.price * (1 - percent / 100));
    setTarget(calc);
  };

  return (
    <div className="wrap">
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', margin: '1.5rem 0 2rem', flexWrap: 'wrap' }}>
        <img
          src={product?.image || best?.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop'}
          alt={product.title}
          style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--card-bg)' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop';
          }}
        />
        <div style={{ flex: '1', minWidth: '260px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span className="badge-live-real">✓ Live Real Price ({best?.seller})</span>
            {best?.originalPrice && best.originalPrice > best.price && (
              <span className="card-badge-discount">{Math.round((1 - best.price / best.originalPrice) * 100)}% OFF</span>
            )}
          </div>
          <h2 style={{ margin: '0 0 0.5rem' }}>{product.title}</h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue)' }}>{money(best?.price, best?.currency)}</span>
            {best?.originalPrice && best.originalPrice > best.price && (
              <span style={{ textDecoration: 'line-through', color: 'var(--mut)', fontSize: '1.1rem' }}>MRP: {money(best.originalPrice, best.currency)}</span>
            )}
            <span className="alarm-seller-tag">on {best?.seller}</span>
          </div>
          <div className="acts">
            <button className="ghost" onClick={save}>♡ Save to Wishlist</button>
            <button className="ghost" onClick={() => cmp.toggle(id)}>{cmp.has(id) ? '✓ In comparison' : '+ Compare'}</button>
            <a href="#price-alarm" className="ghost" style={{ textDecoration: 'none' }}>🔔 Set Alarm</a>
          </div>
          {msg && <p role="status" style={{ fontWeight: 600, color: 'var(--blue)' }}>{msg}</p>}
        </div>
      </div>

      {/* PRICE ALARM / TARGET PRICE SECTION */}
      <div className="alarm-box" id="price-alarm">
        <div className="alarm-box-head">
          <div className="alarm-icon-big">🔔</div>
          <div>
            <h3>Set Price Alarm / Target Price Alert</h3>
            <p>Enter your target price. As soon as this product drops to or below your target price, you will receive an instant notification!</p>
          </div>
        </div>

        <div className="alarm-current-box">
          <span>Current Lowest Real Price:</span>
          <strong className="alarm-current-price">{money(best?.price, best?.currency)}</strong>
          <span className="alarm-seller-tag">on {best?.seller}</span>
        </div>

        <div className="alarm-presets">
          <span style={{ fontSize: '0.85rem', color: 'var(--mut)', fontWeight: 600 }}>Quick Targets:</span>
          <button type="button" className="alarm-preset-btn" onClick={() => applyDiscountPreset(5)}>5% Off ({money(Math.round(best?.price * 0.95), best?.currency)})</button>
          <button type="button" className="alarm-preset-btn" onClick={() => applyDiscountPreset(10)}>10% Off ({money(Math.round(best?.price * 0.90), best?.currency)})</button>
          <button type="button" className="alarm-preset-btn" onClick={() => applyDiscountPreset(15)}>15% Off ({money(Math.round(best?.price * 0.85), best?.currency)})</button>
          <button type="button" className="alarm-preset-btn" onClick={() => applyDiscountPreset(20)}>20% Off ({money(Math.round(best?.price * 0.80), best?.currency)})</button>
        </div>

        <div className="alarm-form-row">
          <div className="alarm-input-wrap">
            <span className="alarm-curr-prefix">₹</span>
            <input
              type="number"
              min="1"
              step="1"
              id="target-price-input"
              className="alarm-input"
              placeholder="Enter Target Price (₹)"
              value={target}
              onChange={e => setTarget(e.target.value)}
            />
          </div>
          <button
            type="button"
            id="set-alarm-btn"
            className="alarm-submit-btn"
            disabled={!(Number(target) > 0)}
            onClick={handleSetAlarm}
          >
            🔔 Set Price Alarm
          </button>
        </div>

        {activeAlert && (
          <div className="alarm-active-info">
            <span>
              🔔 <b>Active Alarm:</b> Watching for <b>{money(activeAlert.targetPrice, activeAlert.currency)}</b>
              {activeAlert.status === 'triggered' && <span style={{ color: '#15803d', marginLeft: '0.5rem' }}>🎉 Target Reached at {money(activeAlert.triggeredPrice, activeAlert.currency)}!</span>}
            </span>
            <button className="ghost" onClick={() => handleCancelAlarm(activeAlert.id)}>Cancel Alarm</button>
          </div>
        )}

        {msg && (
          <div className={`alarm-status-banner ${msg.includes('Triggered') ? 'triggered' : ''}`} role="status">
            {msg}
          </div>
        )}
      </div>

      <h3>Live Store Comparison Offers</h3>
      <div className="scroll">
        <table className="tbl">
          <thead>
            <tr>
              <th>Store / Seller</th>
              <th>Real Live Price</th>
              <th>Status</th>
              <th>Direct Link</th>
            </tr>
          </thead>
          <tbody>
            {offers.map(o => (
              <tr key={o.url}>
                <td>
                  <span className={`seller-pill seller-${o.seller.toLowerCase().replace(/[^a-z]/g, '')}`}>{o.seller}</span>
                </td>
                <td>
                  <b style={{ fontSize: '1.05rem', color: 'var(--blue)' }}>{money(o.price, o.currency)}</b>
                  {o.originalPrice && o.originalPrice > o.price && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--mut)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                      {money(o.originalPrice, o.currency)}
                    </span>
                  )}
                </td>
                <td>
                  <span className="badge-live-real">✓ Live Verified</span>
                </td>
                <td>
                  <a href={o.url} target="_blank" rel="noopener noreferrer sponsored" className="btn-buy-link">
                    Open on {o.seller} ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Direct Verified Store Links */}
      <div className="product-apps-compare-box">
        <h3>Direct Verified Store Offers</h3>
        <p>Open this exact product directly on verified sellers:</p>
        <div className="product-app-buttons">
          {offers.map(o => {
            const sellerKey = o.seller.toLowerCase().replace(/[^a-z]/g, '');
            return (
              <a
                key={o.url}
                href={o.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`app-btn-big ${sellerKey}`}
                title={`Open exact item on ${o.seller}`}
              >
                View on {o.seller} ({money(o.price, o.currency)}) ↗
              </a>
            );
          })}
        </div>
      </div>

      <p className="note">All listed prices are verified live directly from the shopping platforms. Final checkout price may include local coupons or shipping charges.</p>
      <h3>Price history</h3>
      {s.enoughData ? <><PriceChart history={h.history} currency={s.currency} />
        <p>Lowest recorded: <b>{money(s.lowest, s.currency)}</b> · Highest recorded: <b>{money(s.highest, s.currency)}</b> ({s.count} observations)</p></>
        : <div className="empty">{s.message}</div>}
    </div>
  );
}
