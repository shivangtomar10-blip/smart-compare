import { HttpError } from './errors.js';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = v => (typeof v === 'string' ? v.trim() : '');

export function validateRegister(b = {}) {
  const name = str(b.name), email = str(b.email).toLowerCase(), password = typeof b.password === 'string' ? b.password : '';
  if (name.length < 2 || name.length > 60) throw new HttpError(400, 'Name must be 2-60 characters');
  if (!EMAIL.test(email)) throw new HttpError(400, 'A valid email is required');
  if (password.length < 8 || password.length > 72 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
    throw new HttpError(400, 'Password must be 8-72 characters with at least one letter and one number');
  return { name, email, password };
}
export function validateLogin(b = {}) {
  const email = str(b.email).toLowerCase(), password = typeof b.password === 'string' ? b.password : '';
  if (!EMAIL.test(email) || !password) throw new HttpError(400, 'Email and password are required');
  return { email, password };
}
export function validateProductRef(b = {}) {
  const productId = str(b.productId), title = str(b.title);
  if (!productId || productId.length > 300) throw new HttpError(400, 'productId is required');
  if (!title || title.length > 300) throw new HttpError(400, 'title is required');
  const image = typeof b.image === 'string' && /^https?:\/\//.test(b.image) ? b.image : null;
  const price = Number.isFinite(Number(b.lastPrice)) && b.lastPrice !== null ? Number(b.lastPrice) : null;
  return { productId, title, image, lastPrice: price, currency: str(b.currency).slice(0, 3).toUpperCase() || null };
}
