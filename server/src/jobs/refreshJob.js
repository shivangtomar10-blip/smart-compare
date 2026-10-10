import { searchProducts } from '../services/searchService.js';
import { checkAlerts } from '../services/alertService.js';

// Re-queries only enabled providers, only for products someone is tracking, capped per run to respect rate limits.
export async function runRefresh({ store, alertStore, providers, notify, timeoutMs = 6000, maxProducts = 20 }) {
  const summary = { products: 0, refreshed: 0, notFound: 0, errors: 0 };
  const ids = (await alertStore.activeProductIds()).slice(0, maxProducts);
  for (const id of ids) {
    summary.products++;
    try {
      const product = await store.getProduct(id);
      if (!product) continue;
      const r = await searchProducts(product.title.slice(0, 100), providers, { timeoutMs, pageSize: 50 });
      const match = r.products.find(p => p.id === id);
      if (match) { await store.saveSearchResults([match]); summary.refreshed++; } else summary.notFound++;
    } catch (e) { summary.errors++; console.error('refresh failed:', e.message); }
  }
  return { ...summary, alerts: await checkAlerts({ alertStore, store, notify }) };
}

export function startRefreshJob(deps, intervalMinutes) {
  if (!(intervalMinutes > 0)) return null;
  let running = false;
  const timer = setInterval(async () => {
    if (running) return; running = true;
    try { console.log('refresh done', JSON.stringify(await runRefresh(deps))); }
    catch (e) { console.error('refresh job error:', e.message); } finally { running = false; }
  }, intervalMinutes * 60_000);
  timer.unref();
  return timer;
}
