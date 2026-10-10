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
      if (user) api.addRecent({ productId: id, title: p.product.title, image: best?.image }).catch(() => {});
    }).catch(e => setErr(e.status === 404 ? 'Product not found. Search for it first so it gets saved.' : e.message));
  }, [id, user]);
  if (err) return <div className="wrap"><div className="alert" role="alert">{err}</div></div>;
  if (!d) return <div className="wrap"><div className="card skel" /></div>;
  const { product, offers } = d, live = offers.filter(o => !o.isDemo), best = live[0] || offers[0], s = h.summary;
  const guard = fn => async () => { if (!user) return nav('/login'); try { setMsg(await fn()); } catch (e) { setMsg(e.status === 409 ? 'Already done' : e.message); } };
  const save = guard(async () => { await api.addWish({ productId: id, title: product.title, image: best?.image, lastPrice: best?.price, currency: best?.currency }); return 'Saved to wishlist'; });
  const alert = guard(async () => { await api.createAlert(id, Number(target)); return 'Alert created. We will notify you when a live price reaches your target.'; });
  return (
    <div className="wrap">
      <h2>{product.title}</h2>
      <div className="acts"><button className="ghost" onClick={save}>♡ Save</button>
        <button className="ghost" onClick={() => cmp.toggle(id)}>{cmp.has(id) ? '✓ In comparison' : '+ Compare'}</button></div>
      {msg && <p role="status">{msg}</p>}
      <h3>Offers</h3>
      <div className="scroll"><table className="tbl"><thead><tr><th>Seller</th><th>Price</th><th>Last seen</th><th></th></tr></thead><tbody>
        {offers.map(o => <tr key={o.url}><td>{o.seller}{o.isDemo && <span className="badge">SAMPLE</span>}</td><td><b>{money(o.price, o.currency)}</b></td>
          <td>{new Date(o.lastSeenAt).toLocaleString()}{o.stale && <span className="badge"> may be outdated</span>}</td>
          <td><a href={o.url} target="_blank" rel="noopener noreferrer sponsored">View on seller</a></td></tr>)}</tbody></table></div>
      <p className="note">Listed prices only. The seller's final checkout price may differ.</p>
      <h3>Price history</h3>
      {s.enoughData ? <><PriceChart history={h.history} currency={s.currency} />
        <p>Lowest recorded: <b>{money(s.lowest, s.currency)}</b> · Highest recorded: <b>{money(s.highest, s.currency)}</b> ({s.count} observations)</p></>
        : <div className="empty">{s.message}</div>}
      <h3>Price alert</h3>
      <div className="filters"><label>Target price ({best?.currency})<input type="number" min="0.01" step="0.01" value={target} onChange={e => setTarget(e.target.value)} /></label>
        <button className="more" style={{ margin: 0 }} disabled={!(Number(target) > 0)} onClick={alert}>Notify me</button></div>
    </div>
  );
}
