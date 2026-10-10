import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, maxlength: 60 },
  items: { type: [{ _id: false, productId: String, title: String }], validate: v => v.length >= 2 && v.length <= 4 },
}, { timestamps: true });
export default mongoose.models.SavedComparison || mongoose.model('SavedComparison', schema);
