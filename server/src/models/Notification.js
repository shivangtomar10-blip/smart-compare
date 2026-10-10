import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  alertId: String, message: { type: String, required: true }, url: String, read: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.models.Notification || mongoose.model('Notification', schema);
