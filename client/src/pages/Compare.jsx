import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, money } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';

export default function Compare() {
  const { ids, toggle, clear } = useCompare(), { user } = useAuth(), nav = useNavigate();
  const [name, setName] = useState(''), [msg, setMsg] = useState('');
  const saveIt = async () => { if (!user) return nav('/login'); try { await api.saveComparison(name.trim(), ids); setMsg('Saved to your dashboard'); } catch (e) { setMsg(e.message); } };
  const [data, setData] = useState(null), [err, setErr] = useState('');
  useEffect(() => {
    setErr(''); setData(null);
    if (ids.length >= 2) api.compare(ids).then(setData).catch(e => setErr(e.message));
  }, [ids.join(',')]);
  if (ids.length < 2) return <div className="wrap"><div className="empty">Select at least two products with “+ Compare” on the results page.</div></div>;
  if (err) return <div className="wrap"><div className="alert" role="alert">{err}</div></div>;
  if (!data) return <div className="wrap"><div className="card skel" /></div>;
  return (
    <div className="wrap">
      <h2>Compare Products</h2>
      <div className="scroll">
        <table className="tbl cmp">
          <thead>
            <tr>
              <th style={{ width: '160px' }}>Product</th>
              {data.products.map(p => (
                <th key={p.id} style={{ minWidth: '220px', verticalAlign: 'top' }}>
                  <img
                    src={p.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop'}
                    alt={p.title}
                    style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.4rem', border: '1px solid var(--border)' }}
                  />
                  <br />
                  <Link to={`/product/${p.id}`} style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</Link>
                  <br />
                  <button className="ghost" style={{ marginTop: '0.4rem', fontSize: '0.75rem' }} onClick={() => toggle(p.id)}>✕ Remove</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Lowest Listed Price</th>
              {data.products.map(p => (
                <td key={p.id} className={p.id === data.bestPriceProductId ? 'best' : ''}>
                  {p.lowestOffer ? (
                    <>
                      <b style={{ fontSize: '1.2rem', color: 'var(--blue)' }}>{money(p.lowestOffer.price, p.lowestOffer.currency)}</b>
                      {p.id === data.bestPriceProductId && <span style={{ color: '#15803d', fontWeight: 700, marginLeft: '0.3rem' }}>★ Lowest</span>}
                      <br />
                      <small style={{ color: 'var(--mut)' }}>on {p.lowestOffer.seller}</small>
                    </>
                  ) : '—'}
                </td>
              ))}
            </tr>

            <tr>
              <th>Direct Store Offers</th>
              {data.products.map(p => (
                <td key={p.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {(p.offers || []).map(o => {
                      const sellerKey = o.seller.toLowerCase().replace(/[^a-z]/g, '');
                      return (
                        <a
                          key={o.url}
                          href={o.smartUrl || o.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className={`app-mini-btn ${sellerKey}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.4rem 0.6rem',
                            fontSize: '0.85rem',
                            textDecoration: 'none'
                          }}
                          title={`Open exact item on ${o.seller}`}
                        >
                          <span>{o.seller}</span>
                          <b>{money(o.price, o.currency)} ↗</b>
                        </a>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>

            {(data.specRows || []).map(r => (
              <tr key={r.key} className={r.differs ? 'diff' : ''}>
                <th>{r.label}{r.differs && ' (differs)'}</th>
                {r.values.map((v, i) => (
                  <td key={i}>{v || <em>Not available</em>}</td>
                ))}
              </tr>
            ))}

            <tr>
              <th>Best Deal Link</th>
              {data.products.map(p => (
                <td key={p.id}>
                  {p.lowestOffer ? (
                    <a
                      href={p.lowestOffer.smartUrl || p.lowestOffer.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="btn-buy-link"
                      style={{ display: 'inline-block' }}
                    >
                      Buy on {p.lowestOffer.seller} ({money(p.lowestOffer.price, p.lowestOffer.currency)}) ↗
                    </a>
                  ) : '—'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="note">{data.note || 'All listed store prices are authentic, verified directly from official sellers.'}</p>
      <div className="filters"><label>Name<input value={name} maxLength="60" onChange={e => setName(e.target.value)} /></label>
        <button className="ghost" disabled={!name.trim()} onClick={saveIt}>Save comparison</button>
        <button className="ghost" onClick={clear}>Clear comparison</button></div>{msg && <p role="status">{msg}</p>}
    </div>
  );
}
