import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../utils/errors.js';
import { validateAlert } from '../services/alertService.js';

const OID = /^[a-f0-9]{24}$/;
const wrap = fn => (req, res, next) => fn(req, res).catch(next);
const base = (secret, alertStore) => {
  const r = Router();
  r.use(requireAuth(secret));
  r.use((_q, _s, next) => (alertStore ? next() : next(new HttpError(503, 'Database not configured'))));
  return r;
};

export function alertRoutes(secret, { alertStore, store }) {
  const r = base(secret, alertStore);
  r.get('/', wrap(async (req, res) => res.json({ success: true, alerts: await alertStore.list(req.userId) })));
  r.post('/', wrap(async (req, res) => {
    const a = validateAlert(req.body);
    const product = store && await store.getProduct(a.productId);
    if (!product) throw new HttpError(404, 'Product not found');
    if (await alertStore.findActive(req.userId, a.productId)) throw new HttpError(409, 'You already have an active alert for this product');
    if ((await alertStore.countActive(req.userId)) >= 50) throw new HttpError(400, 'Active alert limit (50) reached');
    const offers = await store.getOffers(a.productId);
    const currency = a.currency || offers.find(o => !o.isDemo)?.currency || 'USD';
    const alert = await alertStore.create({ userId: req.userId, productId: a.productId, title: product.title, targetPrice: a.targetPrice, currency });
    res.status(201).json({ success: true, alert });
  }));
  r.delete('/:id', wrap(async (req, res) => {
    if (!OID.test(req.params.id)) throw new HttpError(400, 'Invalid alert id');
    if (!(await alertStore.remove(req.userId, req.params.id))) throw new HttpError(404, 'Alert not found');
    res.json({ success: true });
  }));
  return r;
}

export function notificationRoutes(secret, { alertStore }) {
  const r = base(secret, alertStore);
  r.get('/', wrap(async (req, res) => {
    const items = await alertStore.listNotifications(req.userId);
    res.json({ success: true, notifications: items, unread: items.filter(n => !n.read).length });
  }));
  r.post('/:id/read', wrap(async (req, res) => {
    if (!OID.test(req.params.id)) throw new HttpError(400, 'Invalid notification id');
    if (!(await alertStore.markRead(req.userId, req.params.id))) throw new HttpError(404, 'Notification not found');
    res.json({ success: true });
  }));
  return r;
}
