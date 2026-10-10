import test from 'node:test';
import assert from 'node:assert/strict';
import { extractSpecs, compareProducts, summarizeHistory } from '../services/compareService.js';
import { groupProducts, makeOffer } from '../services/normalize.js';
import { createApp } from '../app.js';

const off = (o) => ({ source: 's', seller: 'S', currency: 'USD', isDemo: false, url: 'u' + Math.random(), ...o });
const A = { id: 'a'.repeat(16), title: 'Acme Laptop 15.6" 16GB RAM 512GB SSD', brand: 'Acme', offers: [off({ price: 700 }), off({ price: 650 })] };
const B = { id: 'b'.repeat(16), title: 'Beta Laptop 14 inch 8GB RAM', brand: 'Beta', offers: [off({ price: 600 })] };

test('product ids are stable 16-hex strings', () => {
  const mk = u => makeOffer({ title: 'HP Laptop 15', brand: 'HP', price: 1, url: u, source: 's' });
  const [g1] = groupProducts([mk('a')]); const [g2] = groupProducts([mk('b')]);
  assert.match(g1.id, /^[a-f0-9]{16}$/); assert.equal(g1.id, g2.id);
});
test('spec extraction, with missing values as null', () => {
  assert.deepEqual(extractSpecs(A.title), { ram: '16 GB', storage: '512 GB', display: '15.6 in' });
  assert.equal(extractSpecs('Plain Phone Case').ram, null);
});
test('comparison highlights lowest price and spec differences', () => {
  const c = compareProducts([A, B]);
  assert.equal(c.priceComparable, true); assert.equal(c.bestPriceProductId, B.id);
  assert.equal(c.products[0].lowestOffer.price, 650);
  const byKey = Object.fromEntries(c.specRows.map(r => [r.key, r]));
  assert.equal(byKey.ram.differs, true); assert.equal(byKey.storage.differs, true); // B lacks storage
  assert.deepEqual(byKey.storage.values, ['512 GB', null]);
});
test('comparison refuses mixed currencies and demo prices', () => {
  const eur = { ...B, offers: [off({ price: 1, currency: 'EUR' })] };
  assert.equal(compareProducts([A, eur]).bestPriceProductId, null);
  const demo = { ...B, offers: [off({ price: 1, isDemo: true })] };
  const c = compareProducts([A, demo]); assert.equal(c.priceComparable, false); assert.equal(c.products[1].lowestIsDemo, true);
});
test('history summary never invents data', () => {
  assert.equal(summarizeHistory([]).enoughData, false);
  const one = [{ price: 10, currency: 'USD', observedAt: '2026-01-01' }];
  assert.equal(summarizeHistory(one).enoughData, false);
  const two = [...one, { price: 8, currency: 'USD', observedAt: '2026-02-01' }];
  const s = summarizeHistory(two); assert.equal(s.enoughData, true); assert.equal(s.lowest, 8); assert.equal(s.highest, 10);
});

test('HTTP: product, offers, history, compare, search persistence', async () => {
  const saved = [];
  const db = { [A.id]: A, [B.id]: B };
  const store = {
    saveSearchResults: async p => { saved.push(...p); },
    getProduct: async id => db[id] && { id, title: db[id].title },
    getOffers: async id => db[id].offers,
    getHistory: async () => [{ price: 5, currency: 'USD', observedAt: '2026-01-01' }],
  };
  const prov = [{ name: 'p', isEnabled: () => true, search: async () => [makeOffer({ title: 'Zed Phone', price: 9, url: 'http://z', source: 'p' })] }];
  const server = createApp(prov, {}, store).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (path, body) => fetch(base + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    assert.equal((await fetch(`${base}/api/products/${A.id}`)).status, 200);
    assert.equal((await fetch(`${base}/api/products/${'c'.repeat(16)}`)).status, 404);
    assert.equal((await fetch(`${base}/api/products/bad-id`)).status, 400);
    const h = await (await fetch(`${base}/api/products/${A.id}/price-history`)).json();
    assert.equal(h.summary.enoughData, false);
    assert.equal((await post('/api/compare', { ids: [A.id] })).status, 400);
    const c = await (await post('/api/compare', { ids: [A.id, B.id] })).json();
    assert.equal(c.bestPriceProductId, B.id);
    assert.equal((await fetch(`${base}/api/products/search?q=zed`)).status, 200);
    assert.equal(saved.length, 1);
  } finally { server.close(); }
  const s2 = createApp([], {}, null).listen(0);
  try { assert.equal((await fetch(`http://127.0.0.1:${s2.address().port}/api/products/${A.id}`)).status, 503); } finally { s2.close(); }
});
