import 'dotenv/config';
import { createApp } from './app.js';
import { connectDB } from './config/db.js';
import { createEbayProvider } from './providers/ebay.js';
import { createProductStore } from './services/productStore.js';
import { createAlertStore } from './services/alertStore.js';
import { createComparisonStore } from './services/comparisonStore.js';
import { createMailer } from './services/mailer.js';
import { createNotifier } from './services/alertService.js';
import { startRefreshJob } from './jobs/refreshJob.js';
import { createDemoProvider } from './providers/demo.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be set to a random string of 32+ characters (see .env.example)'); process.exit(1);
}
const providers = [createEbayProvider(), createDemoProvider()]; // add new adapters here

let mongoUri = process.env.MONGODB_URI;
if (mongoUri === 'memory://') {
  const mongod = await MongoMemoryServer.create();
  mongoUri = mongod.getUri();
  console.log(`Started in-memory MongoDB at ${mongoUri}`);
}

await connectDB(mongoUri).catch(e => { console.error('Database error:', e.message); process.exit(1); });
const port = process.env.PORT || 5000;
const store = createProductStore(), alertStore = createAlertStore();
const notify = createNotifier({ alertStore, mailer: createMailer() });
startRefreshJob({ store, alertStore, providers, notify, maxProducts: Number(process.env.REFRESH_MAX_PRODUCTS) || 20 },
  Number(process.env.REFRESH_INTERVAL_MINUTES) || 0);
createApp(providers, process.env, store, alertStore, createComparisonStore()).listen(port, () => console.log(`SmartCompare API on :${port}`));
