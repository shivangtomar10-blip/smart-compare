import mongoose from 'mongoose';
// One row per (product, source, url). lastSeenAt drives stale-offer handling.
const schema = new mongoose.Schema({
  productId: { type: String, required: true, index: true },
  source: { type: String, required: true }, seller: String, url: { type: String, required: true },
  price: { type: Number, required: true }, currency: { type: String, default: 'USD' }, originalPrice: Number,
  availability: String, isDemo: { type: Boolean, default: false }, lastSeenAt: { type: Date, default: Date.now },
}, { timestamps: true });
schema.index({ productId: 1, source: 1, url: 1 }, { unique: true });
export default mongoose.models.ProductOffer || mongoose.model('ProductOffer', schema);
