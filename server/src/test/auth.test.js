import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import { validateRegister, validateLogin, validateProductRef } from '../utils/validate.js';
import { signToken, verifyToken } from '../utils/token.js';
import { createApp } from '../app.js';

const SECRET = 'x'.repeat(40);

test('register validation', () => {
  assert.deepEqual(validateRegister({ name: ' Asha ', email: 'ASHA@Mail.com', password: 'abc12345' }),
    { name: 'Asha', email: 'asha@mail.com', password: 'abc12345' });
  for (const bad of [{ name: 'A', email: 'a@b.co', password: 'abc12345' }, { name: 'Asha', email: 'nope', password: 'abc12345' },
    { name: 'Asha', email: 'a@b.co', password: 'short1' }, { name: 'Asha', email: 'a@b.co', password: 'onlyletters' }])
    assert.throws(() => validateRegister(bad), e => e.status === 400);
});
test('login and product-ref validation', () => {
  assert.throws(() => validateLogin({ email: 'a@b.co' }));
  assert.equal(validateProductRef({ productId: 'p1', title: 'T', image: 'javascript:x' }).image, null);
  assert.throws(() => validateProductRef({ title: 'T' }));
});
test('passwords are hashed and verifiable', async () => {
  const h = await bcrypt.hash('abc12345', 10);
  assert.notEqual(h, 'abc12345'); assert.ok(await bcrypt.compare('abc12345', h)); assert.ok(!(await bcrypt.compare('wrong', h)));
});
test('jwt round trip, tamper and expiry', async () => {
  assert.equal(verifyToken(signToken('u1', SECRET), SECRET).sub, 'u1');
  assert.throws(() => verifyToken(signToken('u1', SECRET), 'y'.repeat(40)));
  assert.throws(() => verifyToken(signToken('u1', SECRET, '-1s'), SECRET));
});

test('HTTP: health, auth gate, validation (no database needed)', async () => {
  const server = createApp([], { JWT_SECRET: SECRET }).listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await fetch(`${base}/api/health`)).status, 200);
    for (const p of ['/api/users/me', '/api/users/wishlist']) assert.equal((await fetch(base + p)).status, 401);
    const bad = await fetch(`${base}/api/users/me`, { headers: { Authorization: 'Bearer garbage' } });
    assert.equal(bad.status, 401);
    const reg = await fetch(`${base}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'x', password: '1' }) });
    assert.equal(reg.status, 400);
    assert.equal((await fetch(`${base}/api/nope`)).status, 404);
    const s = await fetch(`${base}/api/products/search?q=a`); assert.equal(s.status, 400);
  } finally { server.close(); }
});
