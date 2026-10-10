import mongoose from 'mongoose';
// Append-only: a row is written only when an offer's real price changes (or is first seen).
const schema = new mongoose.Schema({
  productId: { type: String, required: true }, source: String, seller: String,
  price: { type: Number, required: true }, currency: String, observedAt: { type: Date, default: Date.now },
});
schema.index({ productId: 1, observedAt: 1 });
export default mongoose.models.PriceHistory || mongoose.model('PriceHistory', schema);
