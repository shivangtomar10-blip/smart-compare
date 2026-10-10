import { HttpError } from '../utils/errors.js';

export function validateAlert(b = {}) {
  const productId = typeof b.productId === 'string' ? b.productId : '';
  const targetPrice = Number(b.targetPrice);
  if (!/^[a-f0-9]{16}$/.test(productId)) throw new HttpError(400, 'Invalid product id');
  if (!Number.isFinite(targetPrice) || targetPrice <= 0 || targetPrice > 1e9) throw new HttpError(400, 'targetPrice must be a positive number');
  const currency = typeof b.currency === 'string' && /^[a-zA-Z]{3}$/.test(b.currency) ? b.currency.toUpperCase() : null;
  return { productId, targetPrice, currency };
}

const money = (n, c) => `${c} ${n.toFixed(2)}`;

// Checks every active alert against fresh, live (non-demo) offers in the alert's own currency.
export async function checkAlerts({ alertStore, store, notify }) {
  const result = { checked: 0, triggered: 0 };
  for (const alert of await alertStore.listActive()) {
    result.checked++;
    const offers = (await store.getOffers(alert.productId))
      .filter(o => !o.isDemo && !o.stale && o.currency === alert.currency);
    const hit = offers.sort((a, b) => a.price - b.price)[0];
    if (!hit || hit.price > alert.targetPrice) continue;
    if (!(await alertStore.markTriggered(alert.id, hit.price))) continue;
    result.triggered++;
    try { await notify(alert, hit); } catch (e) { console.error('notify failed:', e.message); }
  }
  return result;
}

export const createNotifier = ({ alertStore, mailer }) => async (alert, hit) => {
  const message = `${alert.title || 'A product you track'} is now ${money(hit.price, hit.currency)} at ${hit.seller} (your target: ${money(alert.targetPrice, alert.currency)}). Confirm the final price at checkout.`;
  await alertStore.addNotification({ userId: alert.userId, alertId: alert.id, message, url: hit.url });
  if (!mailer) return;
  try {
    const to = await alertStore.getUserEmail(alert.userId);
    if (to) await mailer.send({ to, subject: 'SmartCompare price alert', text: `${message}\n${hit.url}` });
  } catch (e) { console.error('email failed:', e.message); }
};
