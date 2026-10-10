import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  _id: { type: String, required: true }, // 16-hex id from groupProducts
  title: { type: String, required: true, index: 'text' },
  brand: { type: String, index: true }, image: String, lastSeenAt: { type: Date, default: Date.now },
}, { timestamps: true });
export default mongoose.models.Product || mongoose.model('Product', schema);
