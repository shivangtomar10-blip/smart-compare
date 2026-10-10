import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../utils/errors.js';

const ID = /^[a-f0-9]{16}$/, OID = /^[a-f0-9]{24}$/;
const wrap = fn => (req, res, next) => fn(req, res).catch(next);

export function validateComparison(b = {}) {
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const ids = Array.isArray(b.productIds) ? [...new Set(b.productIds)] : [];
  if (name.length < 1 || name.length > 60) throw new HttpError(400, 'Name must be 1-60 characters');
  if (ids.length < 2 || ids.length > 4 || !ids.every(i => typeof i === 'string' && ID.test(i))) throw new HttpError(400, 'Provide 2 to 4 valid product ids');
  return { name, ids };
}

export default function comparisonRoutes(secret, { comparisonStore, store }) {
  const r = Router();
  r.use(requireAuth(secret));
  r.use((_q, _s, next) => (comparisonStore && store ? next() : next(new HttpError(503, 'Database not configured'))));
  r.get('/', wrap(async (req, res) => res.json({ success: true, comparisons: await comparisonStore.list(req.userId) })));
  r.post('/', wrap(async (req, res) => {
    const { name, ids } = validateComparison(req.body);
    if ((await comparisonStore.count(req.userId)) >= 20) throw new HttpError(400, 'Saved comparison limit (20) reached');
    const items = [];
    for (const id of ids) { const p = await store.getProduct(id); if (!p) throw new HttpError(404, `Product ${id} not found`); items.push({ productId: id, title: p.title }); }
    res.status(201).json({ success: true, comparison: await comparisonStore.create({ userId: req.userId, name, items }) });
  }));
  r.delete('/:id', wrap(async (req, res) => {
    if (!OID.test(req.params.id)) throw new HttpError(400, 'Invalid id');
    if (!(await comparisonStore.remove(req.userId, req.params.id))) throw new HttpError(404, 'Saved comparison not found');
    res.json({ success: true });
  }));
  return r;
}
