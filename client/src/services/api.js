const BASE = import.meta.env.VITE_API_BASE || '';
async function req(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('sc_token');
  const res = await fetch(BASE + path, {
    method, body: body ? JSON.stringify(body) : undefined,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) { const e = new Error(data.error || `Request failed (${res.status})`); e.status = res.status; throw e; }
  return data;
}
export const searchProducts = p =>
  req('/api/products/search?' + new URLSearchParams(Object.entries(p).filter(([, v]) => v !== '' && v != null)));
export const api = {
  auth: (mode, body) => req(`/api/auth/${mode}`, { method: 'POST', body }),
  me: () => req('/api/users/me'),
  updateMe: name => req('/api/users/me', { method: 'PATCH', body: { name } }),
  product: id => req(`/api/products/${id}`),
  history: id => req(`/api/products/${id}/price-history`),
  compare: ids => req('/api/compare', { method: 'POST', body: { ids } }),
  wishlist: () => req('/api/users/wishlist'),
  addWish: item => req('/api/users/wishlist', { method: 'POST', body: item }),
  removeWish: id => req(`/api/users/wishlist/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  recent: () => req('/api/users/recent'),
  addRecent: item => req('/api/users/recent', { method: 'POST', body: item }),
  alerts: () => req('/api/alerts'),
  createAlert: (productId, targetPrice) => req('/api/alerts', { method: 'POST', body: { productId, targetPrice } }),
  deleteAlert: id => req(`/api/alerts/${id}`, { method: 'DELETE' }),
  comparisons: () => req('/api/comparisons'),
  saveComparison: (name, productIds) => req('/api/comparisons', { method: 'POST', body: { name, productIds } }),
  deleteComparison: id => req(`/api/comparisons/${id}`, { method: 'DELETE' }),
  notifications: () => req('/api/notifications'),
  markRead: id => req(`/api/notifications/${id}/read`, { method: 'POST' }),
};
export const money = (n, c = 'USD') => new Intl.NumberFormat(undefined, { style: 'currency', currency: c }).format(n);
