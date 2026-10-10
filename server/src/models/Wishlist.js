import mongoose from 'mongoose';
// Items are snapshots (title/image/last seen price) so the wishlist works without a Product collection.
const itemSchema = new mongoose.Schema({
  productId: { type: String, required: true }, title: String, image: String,
  lastPrice: Number, currency: String, addedAt: { type: Date, default: Date.now },
}, { _id: false });
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: { type: [itemSchema], default: [] },
}, { timestamps: true });
export default mongoose.models.Wishlist || mongoose.model('Wishlist', schema);
