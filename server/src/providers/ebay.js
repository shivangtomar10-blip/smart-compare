// eBay Browse API adapter. Docs: https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search
import { makeOffer } from '../services/normalize.js';

let token = { value: null, exp: 0 };

async function getToken(id, secret, signal) {
  if (token.value && Date.now() < token.exp) return token.value;
  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST', signal,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64') },
    body: 'grant_type=client_credentials&scope=' + encodeURIComponent('https://api.ebay.com/oauth/api_scope'),
  });
  if (!res.ok) throw new Error(`eBay auth failed (${res.status})`);
  const j = await res.json();
  token = { value: j.access_token, exp: Date.now() + (j.expires_in - 60) * 1000 };
  return token.value;
}

export function createEbayProvider(env = process.env) {
  return {
    name: 'ebay',
    isEnabled: () => Boolean(env.EBAY_CLIENT_ID && env.EBAY_CLIENT_SECRET),
    disabledReason: 'Set EBAY_CLIENT_ID and EBAY_CLIENT_SECRET',
    async search(query, { limit = 25, offset = 0, signal } = {}) {
      const t = await getToken(env.EBAY_CLIENT_ID, env.EBAY_CLIENT_SECRET, signal);
      const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`;
      const res = await fetch(url, { signal, headers: { Authorization: `Bearer ${t}`,
        'X-EBAY-C-MARKETPLACE-ID': env.EBAY_MARKETPLACE || 'EBAY_US' } });
      if (res.status === 429) throw new Error('eBay rate limit reached');
      if (!res.ok) throw new Error(`eBay search failed (${res.status})`);
      const data = await res.json();
      return (data.itemSummaries || []).map(i => makeOffer({
        title: i.title, price: i.price?.value, currency: i.price?.currency, url: i.itemWebUrl,
        image: i.image?.imageUrl, seller: i.seller?.username ? `eBay · ${i.seller.username}` : 'eBay',
        source: 'ebay', originalPrice: i.marketingPrice?.originalPrice?.value ?? null,
      })).filter(Boolean);
    },
  };
}
