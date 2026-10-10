import test from 'node:test';
import assert from 'node:assert/strict';
import { validateComparison } from '../routes/comparisons.js';
import { signToken } from '../utils/token.js';
import { createApp } from '../app.js';

const SECRET = 's'.repeat(40), U1 = '1'.repeat(24), U2 = '2'.repeat(24), A = 'a'.repeat(16), B = 'b'.repeat(16);

test('saved comparison validation', () => {
  assert.deepEqual(validateComparison({ name: ' Phones ', productIds: [A, B, A] }), { name: 'Phones', ids: [A, B] });
  for (const bad of [{ name: '', productIds: [A, B] }, { name: 'x', productIds: [A] }, { name: 'x', productIds: [A, 'nope'] }, { name: 'x', productIds: [A, B, 'c'.repeat(16), 'd'.repeat(16), 'e'.repeat(16)] }])
    assert.throws(() => validateComparison(bad), e => e.status === 400);
});

test('HTTP: saved comparisons CRUD, ownership, unknown product', async () => {
  const rows = [];
  const comparisonStore = {
    list: async u => rows.filter(r => r.userId === u), count: async u => rows.filter(r => r.userId === u).length,
    create: async d => { const c = { id: String(rows.length + 1).padStart(24, 'c'), ...d }; rows.push(c); return c; },
    remove: async (u, id) => { const i = rows.findIndex(r => r.id === id && r.userId === u); if (i < 0) return false; rows.splice(i, 1); return true; },
  };
  const store = { getProduct: async id => ([A, B].includes(id) ? { id, title: 'T-' + id[0] } : null) };
  const server = createApp([], { JWT_SECRET: SECRET }, store, null, comparisonStore).listen(0);
  const base = `http://127.0.0.1:${server.address().port}/api/comparisons`;
  const h = u => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${signToken(u, SECRET)}` });
  const post = (b, u = U1) => fetch(base, { method: 'POST', headers: h(u), body: JSON.stringify(b) });
  try {
    assert.equal((await fetch(base)).status, 401);
    assert.equal((await post({ name: 'x', productIds: [A] })).status, 400);
    assert.equal((await post({ name: 'x', productIds: [A, 'c'.repeat(16)] })).status, 404);
    const ok = await post({ name: 'Phones', productIds: [A, B] }); assert.equal(ok.status, 201);
    const { comparison } = await ok.json(); assert.equal(comparison.items.length, 2);
    assert.equal((await (await fetch(base, { headers: h(U1) })).json()).comparisons.length, 1);
    assert.equal((await (await fetch(base, { headers: h(U2) })).json()).comparisons.length, 0);
    assert.equal((await fetch(`${base}/${comparison.id}`, { method: 'DELETE', headers: h(U2) })).status, 404);
    assert.equal((await fetch(`${base}/${comparison.id}`, { method: 'DELETE', headers: h(U1) })).status, 200);
  } finally { server.close(); }
});
