// Spec extraction is a best-effort parse of the listing title; values are labelled as such in the UI.
export function extractSpecs(title = '') {
  const t = title.replace(/,/g, ' ');
  const ram = /(\d{1,3})\s?GB\s?(?:DDR\d\s)?RAM/i.exec(t);
  const storage = /(\d{1,4})\s?(GB|TB)\s?(?:SSD|HDD|ROM|eMMC|storage)/i.exec(t) || /(\d{1,2})\s?TB\b/i.exec(t);
  const display = /(\d{1,2}(?:\.\d)?)\s?(?:"|inch|in\b)/i.exec(t);
  return { ram: ram ? `${ram[1]} GB` : null, storage: storage ? `${storage[1]} ${(storage[2] || 'TB').toUpperCase()}` : null, display: display ? `${display[1]} in` : null };
}
const LABELS = { ram: 'RAM', storage: 'Storage', display: 'Display' };

export function compareProducts(products) {
  const rows = products.map(p => {
    const live = p.offers.filter(o => !o.isDemo);
    const lowestOffer = [...(live.length ? live : p.offers)].sort((a, b) => a.price - b.price)[0] || null;
    return { id: p.id, title: p.title, brand: p.brand, image: p.image, offers: p.offers, lowestOffer,
      lowestIsDemo: Boolean(lowestOffer?.isDemo), specs: extractSpecs(p.title) };
  });
  const specRows = Object.keys(LABELS).map(key => {
    const values = rows.map(r => r.specs[key]);
    const present = values.filter(Boolean);
    return { key, label: LABELS[key], values, missing: present.length === 0,
      differs: present.length > 0 && (new Set(present).size > 1 || present.length < values.length) };
  });
  const priced = rows.filter(r => r.lowestOffer && !r.lowestIsDemo);
  const comparable = priced.length > 1 && new Set(priced.map(r => r.lowestOffer.currency)).size === 1;
  const best = comparable ? [...priced].sort((a, b) => a.lowestOffer.price - b.lowestOffer.price)[0] : null;
  return { products: rows, specRows, priceComparable: comparable, bestPriceProductId: best?.id || null,
    note: comparable ? "Lowest listed price among sellers we found. The seller's final checkout price may differ."
      : 'Prices are not directly comparable (different currencies, sample data, or fewer than two priced products).' };
}

export function summarizeHistory(obs) {
  const times = new Set(obs.map(o => new Date(o.observedAt).getTime()));
  const enough = obs.length >= 2 && times.size >= 2;
  if (!obs.length) return { count: 0, enoughData: false, message: 'No price history recorded yet.' };
  const cur = obs[0].currency; const same = obs.filter(o => o.currency === cur);
  const prices = same.map(o => o.price);
  return { count: obs.length, enoughData: enough, currency: cur, lowest: Math.min(...prices), highest: Math.max(...prices),
    from: obs[0].observedAt, to: obs.at(-1).observedAt,
    message: enough ? null : 'Not enough history yet: prices are only recorded when we observe them.' };
}
