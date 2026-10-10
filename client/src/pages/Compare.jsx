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
    <div className="wrap"><h2>Compare products</h2>
      <div className="scroll"><table className="tbl cmp"><thead><tr><th></th>{data.products.map(p => <th key={p.id}>
        <Link to={`/product/${p.id}`}>{p.title}</Link><br /><button className="ghost" onClick={() => toggle(p.id)}>Remove</button></th>)}</tr></thead><tbody>
        <tr><th>Lowest listed price</th>{data.products.map(p => <td key={p.id} className={p.id === data.bestPriceProductId ? 'best' : ''}>
          {p.lowestOffer ? <><b>{money(p.lowestOffer.price, p.lowestOffer.currency)}</b>{p.id === data.bestPriceProductId && ' ★ lowest'}
            {p.lowestIsDemo && <span className="badge">SAMPLE</span>}<br /><small>{p.lowestOffer.seller}</small></> : '—'}</td>)}</tr>
        {data.specRows.map(r => <tr key={r.key} className={r.differs ? 'diff' : ''}><th>{r.label}{r.differs && ' (differs)'}</th>
          {r.values.map((v, i) => <td key={i}>{v || <em>Not available</em>}</td>)}</tr>)}
        <tr><th>Buy</th>{data.products.map(p => <td key={p.id}>{p.lowestOffer && <a href={p.lowestOffer.url} target="_blank" rel="noopener noreferrer sponsored">View on seller</a>}</td>)}</tr>
        <tr><th>Last updated</th>{data.products.map(p => <td key={p.id}>{p.lowestOffer ? new Date(p.lowestOffer.lastSeenAt).toLocaleString() : '—'}</td>)}</tr>
      </tbody></table></div>
      <p className="note">{data.note} Specs are read from listing titles and may be incomplete.</p>
      <div className="filters"><label>Name<input value={name} maxLength="60" onChange={e => setName(e.target.value)} /></label>
        <button className="ghost" disabled={!name.trim()} onClick={saveIt}>Save comparison</button>
        <button className="ghost" onClick={clear}>Clear comparison</button></div>{msg && <p role="status">{msg}</p>}
    </div>
  );
}
