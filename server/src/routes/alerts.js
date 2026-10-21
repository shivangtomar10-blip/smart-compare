import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { HttpError } from '../utils/errors.js';
import { validateAlert, checkAlerts } from '../services/alertService.js';

const OID = /^[a-f0-9]{24}$/;
const wrap = fn => (req, res, next) => fn(req, res).catch(next);
const base = (secret, alertStore) => {
  const r = Router();
  r.use(requireAuth(secret));
  r.use((_q, _s, next) => (alertStore ? next() : next(new HttpError(503, 'Database not configured'))));
  return r;
};

export function alertRoutes(secret, { alertStore, store, notify }) {
  const r = base(secret, alertStore);
  r.get('/', wrap(async (req, res) => res.json({ success: true, alerts: await alertStore.list(req.userId) })));

  r.post('/', wrap(async (req, res) => {
    const a = validateAlert(req.body);
    const product = store && await store.getProduct(a.productId);
    if (!product) throw new HttpError(404, 'Product not found');
    if (await alertStore.findActive(req.userId, a.productId)) throw new HttpError(409, 'You already have an active price alarm for this product');
    if ((await alertStore.countActive(req.userId)) >= 50) throw new HttpError(400, 'Active alert limit (50) reached');
    const offers = await store.getOffers(a.productId);
    const currency = a.currency || offers[0]?.currency || 'INR';
    const image = product.image || offers[0]?.image || null;
    const alert = await alertStore.create({ userId: req.userId, productId: a.productId, title: product.title, image, targetPrice: a.targetPrice, currency });

    // Immediately evaluate if current lowest price meets target
    let checkSummary = { checked: 0, triggered: 0 };
    if (notify) {
      try {
        checkSummary = await checkAlerts({ alertStore, store, notify });
      } catch (e) {
        console.error('immediate checkAlerts error:', e.message);
      }
    }
    const updatedAlert = (await alertStore.list(req.userId)).find(item => item.id === alert.id) || alert;
    res.status(201).json({ success: true, alert: updatedAlert, triggered: checkSummary.triggered > 0 });
  }));

  // On-demand check for all alerts
  r.post('/check', wrap(async (req, res) => {
    let summary = { checked: 0, triggered: 0 };
    if (notify) {
      summary = await checkAlerts({ alertStore, store, notify });
    }
    const alerts = await alertStore.list(req.userId);
    const notifications = await alertStore.listNotifications(req.userId);
    res.json({ success: true, summary, alerts, notifications, unread: notifications.filter(n => !n.read).length });
  }));

  // Simulate price drop on a tracked product for testing
  r.post('/simulate-drop', wrap(async (req, res) => {
    const { productId, dropPercent = 20 } = req.body;
    if (!productId) throw new HttpError(400, 'productId is required');
    const offers = await store.getOffers(productId);
    if (offers.length === 0) throw new HttpError(404, 'No offers found for this product');
    const lowest = offers[0];
    const newPrice = Math.max(99, Math.round(lowest.price * (1 - dropPercent / 100)));
    const ProductOffer = (await import('../models/ProductOffer.js')).default;
    await ProductOffer.updateOne({ _id: lowest._id }, { $set: { price: newPrice } });
    let summary = { checked: 0, triggered: 0 };
    if (notify) {
      summary = await checkAlerts({ alertStore, store, notify });
    }
    const alerts = await alertStore.list(req.userId);
    const notifications = await alertStore.listNotifications(req.userId);
    res.json({ success: true, oldPrice: lowest.price, newPrice, summary, alerts, notifications, unread: notifications.filter(n => !n.read).length });
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
