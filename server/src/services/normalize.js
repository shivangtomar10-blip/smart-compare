import { createHash } from 'node:crypto';
// Common product format + helpers used by every provider.
export function normalizeQuery(q) {
  if (typeof q !== 'string') throw new Error('Query must be a string');
  const clean = q.replace(/[<>$\\{}]/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
  if (clean.length < 2) throw new Error('Query must be at least 2 characters');
  if (clean.length > 100) throw new Error('Query must be at most 100 characters');
  return clean;
}

export function makeOffer(raw) {
  const price = Number(raw.price);
  if (!raw.title || !Number.isFinite(price) || price < 0 || !raw.url) return null;
  return {
    title: String(raw.title).trim(), brand: raw.brand || null, model: raw.model || null,
    image: raw.image || null, price, currency: raw.currency || 'USD',
    originalPrice: raw.originalPrice ?? null, seller: raw.seller || 'Unknown',
    source: raw.source, isDemo: Boolean(raw.isDemo), availability: raw.availability || 'unknown',
    rating: raw.rating ?? null, reviewCount: raw.reviewCount ?? null, url: raw.url,
    fetchedAt: new Date().toISOString(),
  };
}

// Grouping key: brand + first words of the title with noise removed.
export function productKey(offer) {
  const words = offer.title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(' ')
    .filter(w => w && !['new', 'sealed', 'with', 'and', 'the', 'for', 'unlocked'].includes(w));
  return [offer.brand?.toLowerCase() || '', ...words.slice(0, 5)].join('|');
}

export function dedupeOffers(offers) {
  const seen = new Set();
  return offers.filter(o => { const k = `${o.source}|${o.url}`; if (seen.has(k)) return false; seen.add(k); return true; });
}

// Group offers of the same product; savings only when all offers share a currency.
export function groupProducts(offers) {
  const map = new Map();
  for (const o of offers) {
    const k = productKey(o);
    if (!map.has(k)) map.set(k, { id: createHash('sha1').update(k).digest('hex').slice(0, 16), title: o.title, brand: o.brand, image: o.image, offers: [] });
    map.get(k).offers.push(o);
  }
  return [...map.values()].map(g => {
    g.offers.sort((a, b) => a.price - b.price);
    g.lowestOffer = g.offers[0];
    g.comparableCurrency = new Set(g.offers.map(o => o.currency)).size === 1;
    g.maxSavings = g.comparableCurrency && g.offers.length > 1 ? +(g.offers.at(-1).price - g.offers[0].price).toFixed(2) : null;
    return g;
  });
}
