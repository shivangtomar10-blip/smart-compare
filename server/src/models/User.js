import mongoose from 'mongoose';
const recentSchema = new mongoose.Schema({
  productId: String, title: String, image: String, viewedAt: { type: Date, default: Date.now },
}, { _id: false });
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  recentlyViewed: { type: [recentSchema], default: [] },
}, { timestamps: true });
export default mongoose.models.User || mongoose.model('User', userSchema);
