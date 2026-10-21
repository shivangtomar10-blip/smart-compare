import {
  searchCatalog,
  getCatalogProduct,
  getCatalogHistory,
  compareCatalog
} from './catalog.js';

const BASE = import.meta.env.VITE_API_BASE || '';

// LocalStorage helpers for seamless Vercel static & offline fallback
function getLocal(k, def) {
  try {
    const val = localStorage.getItem(k);
    return val ? JSON.parse(val) : def;
  } catch {
    return def;
  }
}

function setLocal(k, val) {
  try {
    localStorage.setItem(k, JSON.stringify(val));
  } catch {}
}

async function req(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('sc_token');
  const res = await fetch(BASE + path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
  });

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    const e = new Error('Static rewrite returned HTML');
    e.status = 404;
    e.isHtmlRewrite = true;
    throw e;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = new Error(data.error || `Request failed (${res.status})`);
    e.status = res.status;
    throw e;
  }
  return data;
}

// Client-side authentication fallback (handles Vercel 405/404 when no backend server is attached)
function clientSideAuth(mode, body) {
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';
  const name = (body.name || email.split('@')[0] || 'User').trim();

  if (mode === 'register') {
    if (!name || name.length < 2) throw new Error('Please enter a valid full name (at least 2 characters).');
    if (!email || !email.includes('@')) throw new Error('Please enter a valid email address.');
    if (!password || password.length < 8) throw new Error('Password must have at least 8 characters with a letter and a number.');

    const users = getLocal('sc_registered_users', []);
    const existing = users.find(u => u.email === email);
    const user = { id: existing ? existing.id : 'u_' + Date.now(), name, email };
    
    const updatedUsers = users.filter(u => u.email !== email);
    updatedUsers.push({ ...user, password });
    setLocal('sc_registered_users', updatedUsers);
    setLocal('sc_local_user', user);

    return { token: 'sc_token_' + Date.now(), user };
  } else {
    // Login
    if (email === 'demo@smartcompare.in') {
      const demoUser = { id: 'u_demo', name: 'Demo User', email: 'demo@smartcompare.in' };
      setLocal('sc_local_user', demoUser);
      return { token: 'sc_demo_token', user: demoUser };
    }

    const users = getLocal('sc_registered_users', []);
    const found = users.find(u => u.email === email);
    if (found) {
      if (found.password && found.password !== password) {
        throw new Error('Incorrect password. Please verify your credentials.');
      }
      const user = { id: found.id, name: found.name, email: found.email };
      setLocal('sc_local_user', user);
      return { token: 'sc_token_' + Date.now(), user };
    }

    // Auto-create/authenticate for seamless UX
    const user = { id: 'u_' + Date.now(), name: email.split('@')[0], email };
    users.push({ ...user, password });
    setLocal('sc_registered_users', users);
    setLocal('sc_local_user', user);
    return { token: 'sc_token_' + Date.now(), user };
  }
}

export const searchProducts = async p => {
  try {
    const d = await req('/api/products/search?' + new URLSearchParams(Object.entries(p).filter(([, v]) => v !== '' && v != null)));
    if (d && Array.isArray(d.products) && d.products.length > 0) return d;
    return searchCatalog(p.q, p);
  } catch {
    return searchCatalog(p.q, p);
  }
};

export const getFeaturedProducts = async () => {
  try {
    const d = await searchProducts({ q: 'popular' });
    if (d && Array.isArray(d.products) && d.products.length > 0) return d.products;
    return searchCatalog('popular').products.slice(0, 8);
  } catch {
    return searchCatalog('popular').products.slice(0, 8);
  }
};

export const api = {
  auth: async (mode, body) => {
    try {
      return await req(`/api/auth/${mode}`, { method: 'POST', body });
    } catch (err) {
      // Seamless fallback on Vercel static 405/404 or backend offline
      if (err.status === 405 || err.status === 404 || err.isHtmlRewrite || !BASE || err.message?.includes('Failed to fetch')) {
        return clientSideAuth(mode, body);
      }
      throw err;
    }
  },

  me: async () => {
    try {
      return await req('/api/users/me');
    } catch (err) {
      const localUser = getLocal('sc_local_user', null);
      if (localUser) return { user: localUser };
      throw err;
    }
  },

  updateMe: async name => {
    try {
      return await req('/api/users/me', { method: 'PATCH', body: { name } });
    } catch {
      const localUser = getLocal('sc_local_user', { id: 'u_local', name, email: 'user@smartcompare.in' });
      localUser.name = name;
      setLocal('sc_local_user', localUser);
      return { user: localUser };
    }
  },

  product: async id => {
    try {
      const d = await req(`/api/products/${id}`);
      if (d && d.product) return d;
      return getCatalogProduct(id);
    } catch {
      return getCatalogProduct(id);
    }
  },

  history: async id => {
    try {
      const d = await req(`/api/products/${id}/price-history`);
      if (d && d.history) return d;
      return getCatalogHistory(id);
    } catch {
      return getCatalogHistory(id);
    }
  },

  compare: async ids => {
    try {
      const d = await req('/api/compare', { method: 'POST', body: { ids } });
      if (d && Array.isArray(d.products)) return d;
      return compareCatalog(ids);
    } catch {
      return compareCatalog(ids);
    }
  },

  wishlist: async () => {
    try {
      return await req('/api/users/wishlist');
    } catch {
      return { wishlist: getLocal('sc_wishlist', []) };
    }
  },

  addWish: async item => {
    try {
      return await req('/api/users/wishlist', { method: 'POST', body: item });
    } catch {
      const list = getLocal('sc_wishlist', []);
      if (!list.some(i => i.productId === item.productId)) {
        list.push({ ...item, addedAt: new Date().toISOString() });
        setLocal('sc_wishlist', list);
      }
      return { ok: true, wishlist: list };
    }
  },

  removeWish: async id => {
    try {
      return await req(`/api/users/wishlist/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      const list = getLocal('sc_wishlist', []).filter(i => i.productId !== id);
      setLocal('sc_wishlist', list);
      return { ok: true, wishlist: list };
    }
  },

  recent: async () => {
    try {
      return await req('/api/users/recent');
    } catch {
      return { items: getLocal('sc_recent', []) };
    }
  },

  addRecent: async item => {
    try {
      return await req('/api/users/recent', { method: 'POST', body: item });
    } catch {
      const list = getLocal('sc_recent', []).filter(i => i.productId !== item.productId);
      list.unshift({ ...item, viewedAt: new Date().toISOString() });
      setLocal('sc_recent', list.slice(0, 10));
      return { ok: true };
    }
  },

  alerts: async () => {
    try {
      return await req('/api/alerts');
    } catch {
      return { alerts: getLocal('sc_alerts', []) };
    }
  },

  createAlert: async (productId, targetPrice) => {
    try {
      return await req('/api/alerts', { method: 'POST', body: { productId, targetPrice } });
    } catch {
      const alerts = getLocal('sc_alerts', []);
      const existing = alerts.find(a => a.productId === productId);
      const prod = getCatalogProduct(productId);
      const alert = {
        id: 'alt_' + Date.now(),
        productId,
        title: prod?.product?.title || 'Product',
        targetPrice: Number(targetPrice),
        currency: 'INR',
        status: 'active',
        createdAt: new Date().toISOString()
      };
      if (existing) {
        existing.targetPrice = Number(targetPrice);
        existing.status = 'active';
      } else {
        alerts.unshift(alert);
      }
      setLocal('sc_alerts', alerts);
      return { alert };
    }
  },

  deleteAlert: async id => {
    try {
      return await req(`/api/alerts/${id}`, { method: 'DELETE' });
    } catch {
      const alerts = getLocal('sc_alerts', []).filter(a => a.id !== id);
      setLocal('sc_alerts', alerts);
      return { ok: true };
    }
  },

  checkAlerts: async () => {
    try {
      return await req('/api/alerts/check', { method: 'POST' });
    } catch {
      return { checked: true, triggered: 0 };
    }
  },

  simulateDrop: async (productId, dropPercent = 20) => {
    try {
      return await req('/api/alerts/simulate-drop', { method: 'POST', body: { productId, dropPercent } });
    } catch {
      const alerts = getLocal('sc_alerts', []);
      const a = alerts.find(x => x.productId === productId);
      if (a) {
        const dropFactor = 1 - (dropPercent / 100);
        a.status = 'triggered';
        a.triggeredPrice = Math.round(a.targetPrice * dropFactor);
        setLocal('sc_alerts', alerts);

        const notifs = getLocal('sc_notifications', []);
        notifs.unshift({
          id: 'notif_' + Date.now(),
          message: `🎉 Price Alert: "${a.title}" dropped to ₹${a.triggeredPrice}! (Below your target of ₹${a.targetPrice})`,
          productId: a.productId,
          read: false,
          createdAt: new Date().toISOString()
        });
        setLocal('sc_notifications', notifs);
      }
      return { ok: true };
    }
  },

  comparisons: async () => {
    try {
      return await req('/api/comparisons');
    } catch {
      return { comparisons: getLocal('sc_comparisons', []) };
    }
  },

  saveComparison: async (name, productIds) => {
    try {
      return await req('/api/comparisons', { method: 'POST', body: { name, productIds } });
    } catch {
      const list = getLocal('sc_comparisons', []);
      const items = productIds.map(id => {
        const p = getCatalogProduct(id);
        return { productId: id, title: p?.product?.title || 'Product' };
      });
      const comp = { id: 'cmp_' + Date.now(), name, items, createdAt: new Date().toISOString() };
      list.unshift(comp);
      setLocal('sc_comparisons', list);
      return { comparison: comp };
    }
  },

  deleteComparison: async id => {
    try {
      return await req(`/api/comparisons/${id}`, { method: 'DELETE' });
    } catch {
      const list = getLocal('sc_comparisons', []).filter(c => c.id !== id);
      setLocal('sc_comparisons', list);
      return { ok: true };
    }
  },

  notifications: async () => {
    try {
      return await req('/api/notifications');
    } catch {
      const list = getLocal('sc_notifications', []);
      return { notifications: list, unread: list.filter(n => !n.read).length };
    }
  },

  markRead: async id => {
    try {
      return await req(`/api/notifications/${id}/read`, { method: 'POST' });
    } catch {
      const list = getLocal('sc_notifications', []);
      const n = list.find(x => x.id === id);
      if (n) n.read = true;
      setLocal('sc_notifications', list);
      return { ok: true };
    }
  },
};

export const money = (n, c = 'INR') => {
  if (n == null) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: c || 'INR', maximumFractionDigits: 0 }).format(n);
};
