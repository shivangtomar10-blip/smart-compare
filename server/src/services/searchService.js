import { normalizeQuery, dedupeOffers, groupProducts } from './normalize.js';

// Calls every enabled provider concurrently; a failing provider never breaks the others.
export async function searchProducts(rawQuery, providers, opts = {}) {
  const { timeoutMs = 7000, sort = 'relevance', page = 1, pageSize = 20, filters = {} } = opts;
  const query = normalizeQuery(rawQuery);
  const status = [];
  const active = providers.filter(p => {
    if (p.isEnabled()) return true;
    status.push({ provider: p.name, ok: false, enabled: false, error: p.disabledReason });
    return false;
  });

  const settled = await Promise.all(active.map(async p => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const offers = await Promise.race([
        p.search(query, { signal: ctrl.signal }),
        new Promise((_, rej) => ctrl.signal.addEventListener('abort', () => rej(new Error('Timed out')))),
      ]);
      status.push({ provider: p.name, ok: true, enabled: true, count: offers.length });
      return offers;
    } catch (e) {
      status.push({ provider: p.name, ok: false, enabled: true, error: e.message });
      return [];
    } finally { clearTimeout(timer); }
  }));

  let offers = dedupeOffers(settled.flat());
  if (filters.minPrice != null) offers = offers.filter(o => o.price >= filters.minPrice);
  if (filters.maxPrice != null) offers = offers.filter(o => o.price <= filters.maxPrice);
  if (filters.seller) offers = offers.filter(o => o.seller.toLowerCase().includes(filters.seller.toLowerCase()));

  let products = groupProducts(offers);
  const by = {
    price_asc: (a, b) => a.lowestOffer.price - b.lowestOffer.price,
    price_desc: (a, b) => b.lowestOffer.price - a.lowestOffer.price,
    relevance: (a, b) => b.offers.length - a.offers.length,
  }[sort] || (() => 0);
  products.sort(by);

  const total = products.length;
  products = products.slice((page - 1) * pageSize, page * pageSize);
  return { query, products, providerStatus: status.sort((a, b) => a.provider.localeCompare(b.provider)),
    pagination: { page, pageSize, total, hasMore: page * pageSize < total }, fetchedAt: new Date().toISOString() };
}
