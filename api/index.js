import { createApp } from '../server/src/app.js';
import { createDemoProvider } from '../server/src/providers/demo.js';
import { createEbayProvider } from '../server/src/providers/ebay.js';
import { connectDB } from '../server/src/config/db.js';
import { createProductStore } from '../server/src/services/productStore.js';
import { createAlertStore } from '../server/src/services/alertStore.js';
import { createComparisonStore } from '../server/src/services/comparisonStore.js';
import { createMailer } from '../server/src/services/mailer.js';
import { createNotifier } from '../server/src/services/alertService.js';

const providers = [createEbayProvider(), createDemoProvider()];

let store = null;
let alertStore = null;
let comparisonStore = null;
let notify = null;

// Connect to MongoDB Atlas if connection string provided
if (process.env.MONGODB_URI && process.env.MONGODB_URI !== 'memory://') {
  try {
    await connectDB(process.env.MONGODB_URI);
    store = createProductStore();
    alertStore = createAlertStore();
    comparisonStore = createComparisonStore();
    notify = createNotifier({ alertStore, mailer: createMailer() });
  } catch (e) {
    console.error('MongoDB connection error in serverless function:', e.message);
  }
}

const app = createApp(providers, process.env, store, alertStore, comparisonStore, notify);

export default app;
