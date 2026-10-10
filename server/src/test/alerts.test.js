import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAlert, checkAlerts, createNotifier } from '../services/alertService.js';
import { runRefresh } from '../jobs/refreshJob.js';
import { signToken } from '../utils/token.js';
import { makeOffer, groupProducts } from '../services/normalize.js';
import { createApp } from '../app.js';

const SECRET = 's'.repeat(40), PID = 'a'.repeat(16), UID = 'u'.repeat(1) && '1'.repeat(24);
const mkStores = (offers) => {
  const alerts = []; const notes = [];
  const alertStore = {
    list: async u => alerts.filter(a => a.userId === u), countActive: async u => alerts.filter(a => a.userId === u && a.status === 'active').length,
    findActive: async (u, p) => alerts.find(a => a.userId === u && a.productId === p && a.status === 'active'),
    create: async d => { const a = { id: String(alerts.length + 1).padStart(24, 'a'), status: 'active', ...d }; alerts.push(a); return a; },
    remove: async (u, id) => { const i = alerts.findIndex(a => a.id === id && a.userId === u); if (i < 0) return false; alerts.splice(i, 1); return true; },
    listActive: async () => alerts.filter(a => a.status === 'active'), activeProductIds: async () => [...new Set(alerts.filter(a => a.status === 'active').map(a => a.productId))],
    markTriggered: async id => { const a = alerts.find(x => x.id === id && x.status === 'active'); if (!a) return false; a.status = 'triggered'; return true; },
    addNotification: async n => notes.push(n), listNotifications: async () => notes.map((n, i) => ({ id: String(i), read: false, ...n })),
    markRead: async () => true, getUserEmail: async () => 'a@b.co',
  };
  const store = { getProduct: async id => id === PID ? { id, title: 'Acme Phone 128GB' } : null, getOffers: async () => offers, saveSearchResults: async () => {} };
  return { alertStore, store, alerts, notes };
};
const O = (o) => ({ seller: 'S', currency: 'USD', isDemo: false, stale: false, url: 'u', source: 's', ...o });

test('alert validation', () => {
  assert.equal(validateAlert({ productId: PID, targetPrice: '99.5', currency: 'eur' }).currency, 'EUR');
  for (const bad of [{ productId: 'x', targetPrice: 5 }, { productId: PID, targetPrice: -1 }, { productId: PID, targetPrice: 'abc' }])
    assert.throws(() => validateAlert(bad), e => e.status === 400);
});

test('alert triggers once on a live, fresh, same-currency price at or below target', async () => {
  const { alertStore, store, alerts, notes } = mkStores([O({ price: 90 }), O({ price: 10, isDemo: true }), O({ price: 5, stale: true }), O({ price: 1, currency: 'EUR' })]);
  alerts.push({ id: '1'.repeat(24), userId: UID, productId: PID, title: 'Acme', targetPrice: 95, currency: 'USD', status: 'active' });
  const notify = createNotifier({ alertStore, mailer: null });
  assert.deepEqual(await checkAlerts({ alertStore, store, notify }), { checked: 1, triggered: 1 });
  assert.equal(notes.length, 1); assert.match(notes[0].message, /USD 90\.00/);
  assert.equal((await checkAlerts({ alertStore, store, notify })).checked, 0); // already triggered
});

test('alert does not trigger above target; demo-only prices never trigger', async () => {
  const { alertStore, store, alerts } = mkStores([O({ price: 100 }), O({ price: 1, isDemo: true })]);
  alerts.push({ id: '1'.repeat(24), userId: UID, productId: PID, targetPrice: 95, currency: 'USD', status: 'active' });
  assert.equal((await checkAlerts({ alertStore, store, notify: async () => {} })).triggered, 0);
});

test('email failure does not lose the in-app notification', async () => {
  const { alertStore, notes } = mkStores([]);
  const mailer = { send: async () => { throw new Error('smtp down'); } };
  await createNotifier({ alertStore, mailer })({ id: 'x', userId: UID, targetPrice: 5, currency: 'USD', title: 'T' }, O({ price: 4 }));
  assert.equal(notes.length, 1);
});

test('refresh job re-queries tracked products and then checks alerts', async () => {
  const { alertStore, store, alerts } = mkStores([O({ price: 50 })]);
  const offer = makeOffer({ title: 'Acme Phone 128GB', price: 50, url: 'http://x', source: 'p' });
  const [g] = groupProducts([offer]);
  const saved = []; store.getProduct = async () => ({ id: g.id, title: 'Acme Phone 128GB' }); store.saveSearchResults = async p => saved.push(...p);
  alerts.push({ id: '1'.repeat(24), userId: UID, productId: g.id, targetPrice: 60, currency: 'USD', status: 'active' });
  const providers = [{ name: 'p', isEnabled: () => true, search: async () => [offer] }, { name: 'off', isEnabled: () => false, disabledReason: 'x' }];
  const r = await runRefresh({ store, alertStore, providers, notify: async () => {} });
  assert.equal(r.refreshed, 1); assert.equal(saved.length, 1); assert.equal(r.alerts.triggered, 1);
});

test('HTTP: alerts CRUD with auth and ownership', async () => {
  const { alertStore, store } = mkStores([O({ price: 80 })]);
  const server = createApp([], { JWT_SECRET: SECRET }, store, alertStore).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  const h = uid => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${signToken(uid, SECRET)}` });
  const post = (b, uid = UID) => fetch(`${base}/api/alerts`, { method: 'POST', headers: h(uid), body: JSON.stringify(b) });
  try {
    assert.equal((await fetch(`${base}/api/alerts`)).status, 401);
    assert.equal((await post({ productId: PID, targetPrice: -5 })).status, 400);
    assert.equal((await post({ productId: 'b'.repeat(16), targetPrice: 50 })).status, 404);
    const ok = await post({ productId: PID, targetPrice: 70 }); assert.equal(ok.status, 201);
    const { alert } = await ok.json(); assert.equal(alert.currency, 'USD');
    assert.equal((await post({ productId: PID, targetPrice: 60 })).status, 409);
    assert.equal((await (await fetch(`${base}/api/alerts`, { headers: h(UID) })).json()).alerts.length, 1);
    const other = '2'.repeat(24);
    assert.equal((await fetch(`${base}/api/alerts/${alert.id}`, { method: 'DELETE', headers: h(other) })).status, 404);
    assert.equal((await fetch(`${base}/api/alerts/${alert.id}`, { method: 'DELETE', headers: h(UID) })).status, 200);
    assert.equal((await fetch(`${base}/api/notifications`, { headers: h(UID) })).status, 200);
  } finally { server.close(); }
});
