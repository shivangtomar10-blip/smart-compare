// SAMPLE data only. Always flagged isDemo=true; never presented as live prices.
import { makeOffer } from '../services/normalize.js';
const SAMPLE = [
  { title: 'Sample Wireless Headphones X1', brand: 'SampleBrand', price: 59.99, seller: 'Demo Store A' },
  { title: 'Sample Wireless Headphones X1', brand: 'SampleBrand', price: 54.5, seller: 'Demo Store B' },
  { title: 'Sample Running Shoes R2', brand: 'SampleBrand', price: 79, seller: 'Demo Store A' },
];
export function createDemoProvider(env = process.env) {
  return {
    name: 'demo', isEnabled: () => env.ENABLE_DEMO === 'true', disabledReason: 'Set ENABLE_DEMO=true',
    async search(query) {
      const terms = query.split(' ');
      return SAMPLE.filter(s => terms.some(t => s.title.toLowerCase().includes(t)))
        .map(s => makeOffer({ ...s, url: `https://example.com/demo/${encodeURIComponent(s.title + s.seller)}`, source: 'demo', isDemo: true }));
    },
  };
}
