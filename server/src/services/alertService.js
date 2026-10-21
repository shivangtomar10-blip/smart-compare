import { HttpError } from '../utils/errors.js';

export function validateAlert(b = {}) {
  const productId = typeof b.productId === 'string' ? b.productId : '';
  const targetPrice = Number(b.targetPrice);
  if (!/^[a-f0-9]{16}$/.test(productId)) throw new HttpError(400, 'Invalid product id');
  if (!Number.isFinite(targetPrice) || targetPrice <= 0 || targetPrice > 1e9) throw new HttpError(400, 'targetPrice must be a positive number');
  const currency = typeof b.currency === 'string' && /^[a-zA-Z]{3}$/.test(b.currency) ? b.currency.toUpperCase() : null;
  return { productId, targetPrice, currency };
}

const money = (n, c) => (c === 'INR' ? `₹${Math.round(n)}` : `${c} ${n.toFixed(2)}`);

// Checks every active alert against fresh offers in the alert's own currency.
export async function checkAlerts({ alertStore, store, notify }) {
  const result = { checked: 0, triggered: 0 };
  if (!alertStore || !store || !notify) return result;
  for (const alert of await alertStore.listActive()) {
    result.checked++;
    const allOffers = await store.getOffers(alert.productId);
    const live = allOffers.filter(o => !o.isDemo && !o.stale && o.currency === alert.currency);
    const offers = live.length > 0 ? live : allOffers.filter(o => o.currency === alert.currency);
    const hit = offers.sort((a, b) => a.price - b.price)[0];
    if (!hit || hit.price > alert.targetPrice) continue;
    if (!(await alertStore.markTriggered(alert.id, hit.price))) continue;
    result.triggered++;
    try { await notify(alert, hit); } catch (e) { console.error('notify failed:', e.message); }
  }
  return result;
}

export const createNotifier = ({ alertStore, mailer }) => async (alert, hit) => {
  const currencySymbol = hit.currency === 'INR' ? '₹' : `${hit.currency} `;
  const message = `🔔 Price Alarm Triggered! "${alert.title || 'Product'}" is now down to ${currencySymbol}${hit.price} on ${hit.seller} (your target: ${currencySymbol}${alert.targetPrice})!`;
  await alertStore.addNotification({ userId: alert.userId, alertId: alert.id, message, url: hit.url });
  if (!mailer) return;
  try {
    const to = await alertStore.getUserEmail(alert.userId);
    if (to) await mailer.send({ to, subject: `SmartCompare Price Alarm: ${alert.title}`, text: `${message}\n${hit.url}` });
  } catch (e) { console.error('email failed:', e.message); }
};
