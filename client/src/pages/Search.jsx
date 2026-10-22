import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchProducts } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const sort = params.get('sort') || 'relevance';
  const minPrice = params.get('minPrice') || '';
  const maxPrice = params.get('maxPrice') || '';
  const seller = params.get('seller') || '';
  const [state, setState] = useState({ loading: false, error: '', products: [], status: [], pagination: null });
  const [page, setPage] = useState(1);

  async function load(p) {
    setState(s => ({ ...s, loading: true, error: '' }));
    try {
      const d = await searchProducts({ q, sort, minPrice, maxPrice, seller, page: p });
      const newProds = Array.isArray(d?.products) ? d.products : [];
      setState(s => ({
        loading: false,
        error: '',
        products: p === 1 ? newProds : [...s.products, ...newProds],
        status: Array.isArray(d?.providerStatus) ? d.providerStatus : [],
        pagination: d?.pagination || null
      }));
    } catch (e) {
      setState(s => ({ ...s, loading: false, error: e.message, products: p === 1 ? [] : s.products }));
    }
  }
  useEffect(() => { setPage(1); if (q.length >= 2) load(1); }, [q, sort, minPrice, maxPrice, seller]);

  const set = (k, v) => { const n = new URLSearchParams(params); v ? n.set(k, v) : n.delete(k); setParams(n); };
  const { loading, error, pagination } = state;
  const products = Array.isArray(state.products) ? state.products : [];
  const status = Array.isArray(state.status) ? state.status : [];
  const live = status.filter(s => s && s.ok), none = status.length > 0 && live.length === 0;

  return (
    <div className="wrap">
      <h2>Results for “{q}”</h2>
      <div className="filters">
        <label>Sort <select value={sort} onChange={e => set('sort', e.target.value)}>
          <option value="relevance">Best Match (Flipkart)</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select></label>
        <label>Min <input type="number" min="0" defaultValue={minPrice} onBlur={e => set('minPrice', e.target.value)} /></label>
        <label>Max <input type="number" min="0" defaultValue={maxPrice} onBlur={e => set('maxPrice', e.target.value)} /></label>
        <label>Store <select value={seller} onChange={e => set('seller', e.target.value)}>
          <option value="">All Stores (Flipkart, Meesho, Nykaa, Shopsy, Croma...)</option>
          <option value="Flipkart">Flipkart</option>
          <option value="Meesho">Meesho</option>
          <option value="Nykaa">Nykaa</option>
          <option value="Shopsy">Shopsy</option>
          <option value="Croma">Croma</option>
          <option value="Amazon">Amazon India</option>
          <option value="Myntra">Myntra</option>
        </select></label>
      </div>
      {status.length > 0 && <ul className="status">
        {status.filter(s => s && s.ok).map(s => (
          <li key={s.provider} className="ok">
            ✓ Live Verified Prices ({s.count} authentic products fetched directly from stores)
          </li>
        ))}
      </ul>}
      {error && <div className="alert" role="alert">{error} <button onClick={() => load(1)}>Retry</button></div>}
      {loading && products.length === 0 && <div className="grid">{[1, 2, 3, 4].map(i => <div key={i} className="card skel" />)}</div>}
      {!loading && !error && products.length === 0 && q.length >= 2 && (
        <div className="empty">{none ? 'No shopping source is configured or reachable. See the setup guide to add API keys.'
          : 'No products found. Try a broader term, a different spelling, or fewer filters.'}</div>)}
      <div className="grid">{products.map(p => <ProductCard key={p.id} product={p} />)}</div>
      {pagination?.hasMore && <button className="more" disabled={loading} onClick={() => { setPage(page + 1); load(page + 1); }}>{loading ? 'Loading…' : 'Load more'}</button>}
      <p className="note">Prices are listed prices at the time shown. The final checkout price on the seller's site may differ.</p>
    </div>
  );
}
