import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  productId: { type: String, required: true }, title: String,
  targetPrice: { type: Number, required: true, min: 0 }, currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['active', 'triggered'], default: 'active', index: true },
  triggeredAt: Date, triggeredPrice: Number,
}, { timestamps: true });
export default mongoose.models.PriceAlert || mongoose.model('PriceAlert', schema);
