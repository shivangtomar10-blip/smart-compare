import { Router } from 'express';
import { HttpError } from '../utils/errors.js';
import { compareProducts, summarizeHistory } from '../services/compareService.js';

const ID = /^[a-f0-9]{16}$/;
export default function productRoutes(store) {
  const r = Router();
  r.use(['/products', '/compare'], (_req, _res, next) => (store ? next() : next(new HttpError(503, 'Database not configured'))));
  const wrap = fn => (req, res, next) => fn(req, res).catch(next);
  const needId = id => { if (!ID.test(id)) throw new HttpError(400, 'Invalid product id'); };
  const load = async id => { needId(id); const p = await store.getProduct(id); if (!p) throw new HttpError(404, 'Product not found'); return p; };

  r.get('/products/:id', wrap(async (req, res) => {
    const product = await load(req.params.id);
    res.json({ success: true, product, offers: await store.getOffers(product.id) });
  }));
  r.get('/products/:id/offers', wrap(async (req, res) => {
    await load(req.params.id); res.json({ success: true, offers: await store.getOffers(req.params.id) });
  }));
  r.get('/products/:id/price-history', wrap(async (req, res) => {
    await load(req.params.id);
    const history = await store.getHistory(req.params.id);
    res.json({ success: true, history, summary: summarizeHistory(history) });
  }));
  r.post('/compare', wrap(async (req, res) => {
    const ids = Array.isArray(req.body?.ids) ? [...new Set(req.body.ids)] : [];
    if (ids.length < 2 || ids.length > 4) throw new HttpError(400, 'Provide 2 to 4 distinct product ids');
    const products = [];
    for (const id of ids) { const p = await load(id); products.push({ ...p, offers: await store.getOffers(id) }); }
    res.json({ success: true, ...compareProducts(products) });
  }));
  return r;
}
