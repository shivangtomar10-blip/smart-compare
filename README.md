# SmartCompare

Product price comparison: search, compare listed prices across sellers, save products, track price history, get price alerts.

- **client/**: React 18 + Vite (plain CSS)
- **server/**: Node 18+ / Express, MongoDB (Mongoose), JWT auth, provider adapters

## Prerequisites
- Node.js 18 or newer (`node -v`)
- MongoDB: local ([install guide](https://www.mongodb.com/docs/manual/installation/)) or a free MongoDB Atlas cluster
- Optional: an eBay developer account for live data (see below)

## Quick start (two terminals; open the `smartcompare` folder in VS Code)

**Terminal 1: backend**
```bash
cd server
npm install
cp .env.example .env        # Windows: copy .env.example .env
# edit .env: set JWT_SECRET and MONGODB_URI (see below)
npm start                   # http://localhost:5000
```
**Terminal 2: frontend**
```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```
Start MongoDB first if it is local (e.g. `mongod`, or the MongoDB service on Windows/macOS).

## Environment variables (`server/.env`)
| Variable | Required | Meaning |
|---|---|---|
| `JWT_SECRET` | yes | 32+ random chars. `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `MONGODB_URI` | yes | e.g. `mongodb://127.0.0.1:27017/smartcompare` or your Atlas string |
| `PORT` | no | default 5000 |
| `CLIENT_ORIGIN` | no | the frontend URL allowed by CORS (default `http://localhost:5173`) |
| `PROVIDER_TIMEOUT_MS` | no | per-provider timeout, default 6000 |
| `EBAY_CLIENT_ID`, `EBAY_CLIENT_SECRET`, `EBAY_MARKETPLACE` | for live data | eBay Browse API credentials; marketplace e.g. `EBAY_US`, `EBAY_GB`, `EBAY_DE` |
| `ENABLE_DEMO` | no | `true` adds clearly labelled SAMPLE results (never live prices) |
| `REFRESH_INTERVAL_MINUTES` | no | `0` = background refresh off. e.g. `360` re-checks tracked products every 6 h |
| `REFRESH_MAX_PRODUCTS` | no | cap per refresh run (default 20) |
| `SMTP_HOST/PORT/SECURE/USER/PASS/FROM` | no | enables alert emails; without them alerts show in-app only |

`client/.env` (optional): `VITE_API_BASE` is empty in development (Vite proxies `/api` to port 5000). Set it to your backend URL in production.

## Getting live product data
1. Create a developer account at https://developer.ebay.com and create an application to get a **production** keyset (App ID = client id, Cert ID = client secret).
2. Put them in `server/.env`. The adapter uses the Browse API `item_summary/search` with OAuth client-credentials.
3. Restart the server. Search results show each provider's status; unconfigured providers say so.

eBay's terms (attribution, caching, call limits) apply; check their current documentation. Amazon, Flipkart and similar sources require affiliate/partner approval and are **not** integrated. To add one, copy `server/src/providers/ebay.js`, implement `name`, `isEnabled()`, `disabledReason` and `search(query, {signal})` returning `makeOffer(...)` objects, then register it in `server/src/server.js`. Do not scrape sites that forbid it.

With no credentials, set `ENABLE_DEMO=true` to see the UI with sample data (badged "SAMPLE DATA").

## Tests
```bash
cd server && npm test      # 26 tests, Node's built-in runner, no database needed
```
Tests use in-memory stand-ins for the database. The client has no automated tests; verify it manually.

## API summary
`GET /api/health` · `GET /api/products/search?q=&sort=&page=&minPrice=&maxPrice=&seller=` · `GET /api/products/:id[/offers|/price-history]` · `POST /api/compare` · `POST /api/auth/register|login` · `GET|PATCH /api/users/me` · `GET|POST /api/users/wishlist`, `DELETE /api/users/wishlist/:productId` · `GET|POST /api/users/recent` · `GET|POST /api/alerts`, `DELETE /api/alerts/:id` · `GET /api/notifications`, `POST /api/notifications/:id/read` · `GET|POST /api/comparisons`, `DELETE /api/comparisons/:id`. Private routes need `Authorization: Bearer <token>`.

## Troubleshooting
- **Server exits: "JWT_SECRET must be set"**: add a 32+ character value to `server/.env`.
- **"Database error" / ECONNREFUSED**: MongoDB isn't running or `MONGODB_URI` is wrong; for Atlas, allow your IP in Network Access.
- **Search says no source configured**: add eBay keys or set `ENABLE_DEMO=true`.
- **CORS error in browser**: `CLIENT_ORIGIN` must exactly match the frontend origin (scheme, host, port).
- **Product page says "Product not found"**: products are saved when a search returns them; search first. Needs MongoDB.
- **`npm install` symlink errors**: don't install inside a folder that doesn't support symlinks (some synced/network drives).
- **Port in use**: change `PORT` (and the proxy target in `client/vite.config.js`).

## Deployment
- **Backend** (Render, Railway, Fly.io, a VPS): root `server`, build `npm install`, start `npm start`. Set all env vars there, use an Atlas `MONGODB_URI`, set `CLIENT_ORIGIN` to your deployed frontend URL (no trailing slash), and serve over HTTPS.
- **Frontend** (Netlify, Vercel, any static host): root `client`, build `npm run build`, publish `dist`. Set `VITE_API_BASE` to the backend URL at build time. Add an SPA fallback (all paths to `index.html`) so routes like `/product/:id` work on refresh.
- Behind a proxy/load balancer, consider `app.set('trust proxy', 1)` so rate limiting sees real client IPs.

## Verification checklist
**Implemented and covered by automated tests (server logic, in-memory stand-ins):** query validation, offer normalization, deduplication and grouping, multi-provider aggregation, provider failure and timeout isolation, filters and pagination, registration/login validation, password hashing, JWT handling, auth gating, product/offers/history/compare endpoints, spec parsing and comparison rules (mixed currency and demo prices excluded), price-history summaries, alert validation and triggering rules, notification fallback when email fails, refresh job, alert and saved-comparison endpoints with ownership checks.

**Implemented, needs credentials or services to run:** live search (eBay keys); alert emails (SMTP); background price refresh (`REFRESH_INTERVAL_MINUTES`); everything stored in MongoDB.

**Written but never executed:** the Mongoose stores/models against a real MongoDB, the eBay adapter against the live API, SMTP sending, and the React UI in a browser (it only passes `vite build`).

**Limitations:**
- Only eBay is integrated; coverage depends on that API (and your marketplace), not "every product online".
- eBay search results have no structured specs or stock status; specs are best-effort parsed from titles, availability is "unknown".
- Price history only grows from observations (searches or the refresh job); nothing is back-filled.
- Alerts are checked by the refresh job (off by default), not instantly.
- Load More re-queries providers per page (no result cache yet).
- Login token is stored in `localStorage` (simple, but exposed to XSS); no email verification or password reset.
- No client tests, no end-to-end tests, and no accessibility audit beyond labels, focus styles and semantic markup.
