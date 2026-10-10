import { money } from '../services/api.js';
// Dependency-free SVG line chart of recorded observations (lowest price per timestamp).
export default function PriceChart({ history, currency }) {
  const byTime = new Map();
  history.filter(h => h.currency === currency).forEach(h => {
    const t = new Date(h.observedAt).getTime(); byTime.set(t, Math.min(byTime.get(t) ?? Infinity, h.price));
  });
  const pts = [...byTime.entries()].sort((a, b) => a[0] - b[0]);
  const W = 600, H = 200, P = 30;
  const [t0, t1] = [pts[0][0], pts.at(-1)[0]], prices = pts.map(p => p[1]);
  const [lo, hi] = [Math.min(...prices), Math.max(...prices)];
  const x = t => P + ((t - t0) / (t1 - t0 || 1)) * (W - 2 * P), y = v => H - P - ((v - lo) / (hi - lo || 1)) * (H - 2 * P);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Price history from ${money(lo, currency)} to ${money(hi, currency)}`} className="chart">
      <polyline fill="none" stroke="#7c3aed" strokeWidth="2.5" points={pts.map(([t, v]) => `${x(t)},${y(v)}`).join(' ')} />
      {pts.map(([t, v]) => <circle key={t} cx={x(t)} cy={y(v)} r="4" fill="#2563eb"><title>{`${new Date(t).toLocaleString()}: ${money(v, currency)}`}</title></circle>)}
      <text x={P} y={14} fontSize="11" fill="#64748b">{money(hi, currency)}</text>
      <text x={P} y={H - 8} fontSize="11" fill="#64748b">{money(lo, currency)} · {new Date(t0).toLocaleDateString()} – {new Date(t1).toLocaleDateString()}</text>
    </svg>
  );
}
