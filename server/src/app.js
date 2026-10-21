import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { searchProducts } from './services/searchService.js';
import { checkAlerts } from './services/alertService.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import comparisonRoutes from './routes/comparisons.js';
import { alertRoutes, notificationRoutes } from './routes/alerts.js';

export function createApp(providers, env = process.env, store = null, alertStore = null, comparisonStore = null, notify = null) {
  const app = express();
  const secret = env.JWT_SECRET || 'smartcompare-production-jwt-secret-key-32chars-min-secure';
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: env.CLIENT_ORIGIN ? (env.CLIENT_ORIGIN === '*' ? true : env.CLIENT_ORIGIN) : true, credentials: true }));
  app.use(express.json({ limit: '10kb' }));
  app.use('/api/', rateLimit({ windowMs: 60_000, limit: 120 }));

  app.get('/api/health', (_req, res) => res.json({ success: true, status: 'ok', time: new Date().toISOString() }));

  app.get('/api/products/search', async (req, res, next) => {
    try {
      const num = v => (v === undefined || v === '' ? undefined : Number(v));
      const data = await searchProducts(req.query.q, providers, {
        timeoutMs: Number(env.PROVIDER_TIMEOUT_MS) || 7000,
        sort: req.query.sort, page: Math.max(1, Number(req.query.page) || 1),
        filters: { minPrice: num(req.query.minPrice), maxPrice: num(req.query.maxPrice), seller: req.query.seller },
      });
      if (store) {
        await store.saveSearchResults(data.products).catch(e => console.error('save failed:', e.message));
        if (alertStore && notify) {
          checkAlerts({ alertStore, store, notify }).catch(() => {});
        }
      }
      res.json({ success: true, ...data });
    } catch (e) { next(e); }
  });

  app.use('/api', productRoutes(store));
  if (secret) {
    app.use('/api/auth', authRoutes(secret));
    app.use('/api/users', userRoutes(secret));
    app.use('/api/alerts', alertRoutes(secret, { alertStore, store, notify }));
    app.use('/api/comparisons', comparisonRoutes(secret, { comparisonStore, store }));
    app.use('/api/notifications', notificationRoutes(secret, { alertStore }));
  }
  app.use('/api', (_req, res) => res.status(404).json({ success: false, error: 'Not found' }));

  app.use((err, _req, res, _next) => {
    let status = err.status || (/Query must/.test(err.message) ? 400 : err.type === 'entity.parse.failed' ? 400 : 500);
    if (status === 500) console.error(err.message); // never log request bodies or secrets
    res.status(status).json({ success: false, error: status === 500 ? 'Internal server error' : err.message });
  });
  return app;
}
