import Product from '../models/Product.js';
import ProductOffer from '../models/ProductOffer.js';
import PriceHistory from '../models/PriceHistory.js';

export const STALE_MS = 24 * 3600_000;

export function createProductStore() {
  return {
    // Persist search results. Demo (sample) offers are stored but never enter price history.
    async saveSearchResults(products) {
      for (const p of products) {
        await Product.updateOne({ _id: p.id }, { $set: { title: p.title, brand: p.brand, image: p.image, lastSeenAt: new Date() } }, { upsert: true });
        for (const o of p.offers) {
          const prev = await ProductOffer.findOneAndUpdate({ productId: p.id, source: o.source, url: o.url },
            { $set: { seller: o.seller, price: o.price, currency: o.currency, originalPrice: o.originalPrice, availability: o.availability, isDemo: o.isDemo, image: o.image || p.image, lastSeenAt: new Date() } },
            { upsert: true, new: false });
          if (!o.isDemo && (!prev || prev.price !== o.price))
            await PriceHistory.create({ productId: p.id, source: o.source, seller: o.seller, price: o.price, currency: o.currency });
        }
      }
    },
    async getProduct(id) {
      const p = await Product.findById(id).lean();
      return p && { id: p._id, title: p.title, brand: p.brand, image: p.image, lastSeenAt: p.lastSeenAt };
    },
    async getOffers(id) {
      const rows = await ProductOffer.find({ productId: id }).sort({ price: 1 }).lean();
      return rows.map(o => ({ ...o, stale: Date.now() - new Date(o.lastSeenAt).getTime() > STALE_MS }));
    },
    async getHistory(id) { return PriceHistory.find({ productId: id }).sort({ observedAt: 1 }).lean(); },
  };
}
