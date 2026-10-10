import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeQuery, makeOffer, dedupeOffers, groupProducts } from '../services/normalize.js';
import { searchProducts } from '../services/searchService.js';

const mk = (name, offers, { enabled = true, fail = false, delay = 0 } = {}) => ({
  name, isEnabled: () => enabled, disabledReason: 'no key',
  async search() {
    if (delay) await new Promise(r => setTimeout(r, delay));
    if (fail) throw new Error('boom');
    return offers.map(o => makeOffer({ source: name, url: `https://x/${name}/${o.price}`, ...o }));
  },
});

test('query validation', () => {
  assert.equal(normalizeQuery('  iPhone   17 '), 'iphone 17');
  assert.throws(() => normalizeQuery('a'));
  assert.throws(() => normalizeQuery('x'.repeat(101)));
});
test('invalid offers are dropped', () => {
  assert.equal(makeOffer({ title: 'x', price: 'abc', url: 'u' }), null);
});
test('dedupe removes identical source+url', () => {
  const o = makeOffer({ title: 'A', price: 1, url: 'u', source: 's' });
  assert.equal(dedupeOffers([o, { ...o }]).length, 1);
});
test('same product from two sellers is grouped, lowest first', () => {
  const a = { title: 'HP Laptop 15', brand: 'HP', price: 500, seller: 'A' };
  const b = { title: 'HP Laptop 15', brand: 'HP', price: 450, seller: 'B' };
  const [g] = groupProducts([a, b].map((x, i) => makeOffer({ ...x, url: 'u' + i, source: 's' })));
  assert.equal(g.offers.length, 2);
  assert.equal(g.lowestOffer.price, 450);
  assert.equal(g.maxSavings, 50);
});
test('aggregation merges providers and isolates failures', async () => {
  const r = await searchProducts('hp laptop', [
    mk('p1', [{ title: 'HP Laptop 15', brand: 'HP', price: 500 }]),
    mk('p2', [{ title: 'HP Laptop 15', brand: 'HP', price: 450 }]),
    mk('bad', [], { fail: true }),
    mk('off', [], { enabled: false }),
  ]);
  assert.equal(r.products.length, 1);
  assert.equal(r.products[0].offers.length, 2);
  const st = Object.fromEntries(r.providerStatus.map(s => [s.provider, s]));
  assert.equal(st.bad.ok, false);
  assert.equal(st.off.enabled, false);
  assert.equal(st.p1.ok, true);
});
test('slow provider times out without blocking others', async () => {
  const r = await searchProducts('phone', [
    mk('fast', [{ title: 'Phone Z', price: 10 }]),
    mk('slow', [{ title: 'Phone Q', price: 5 }], { delay: 300 }),
  ], { timeoutMs: 50 });
  assert.equal(r.products.length, 1);
  assert.match(r.providerStatus.find(s => s.provider === 'slow').error, /Timed out/);
});
test('price filters and pagination', async () => {
  const offers = Array.from({ length: 30 }, (_, i) => ({ title: `Item ${i} Thing`, price: i + 1 }));
  const r = await searchProducts('item', [mk('p', offers)], { filters: { minPrice: 5 }, pageSize: 10 });
  assert.equal(r.pagination.total, 26);
  assert.equal(r.products.length, 10);
  assert.equal(r.pagination.hasMore, true);
});
