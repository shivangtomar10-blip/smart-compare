import PriceAlert from '../models/PriceAlert.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

const toAlert = a => a && ({ id: String(a._id), userId: String(a.userId), productId: a.productId, title: a.title,
  targetPrice: a.targetPrice, currency: a.currency, status: a.status, triggeredAt: a.triggeredAt, triggeredPrice: a.triggeredPrice, createdAt: a.createdAt });
const toNote = n => ({ id: String(n._id), alertId: n.alertId, message: n.message, url: n.url, read: n.read, createdAt: n.createdAt });

export function createAlertStore() {
  return {
    list: async userId => (await PriceAlert.find({ userId }).sort({ createdAt: -1 }).lean()).map(toAlert),
    countActive: userId => PriceAlert.countDocuments({ userId, status: 'active' }),
    findActive: async (userId, productId) => toAlert(await PriceAlert.findOne({ userId, productId, status: 'active' }).lean()),
    create: async d => toAlert((await PriceAlert.create(d)).toObject()),
    remove: async (userId, id) => (await PriceAlert.deleteOne({ _id: id, userId })).deletedCount > 0,
    listActive: async () => (await PriceAlert.find({ status: 'active' }).lean()).map(toAlert),
    activeProductIds: () => PriceAlert.distinct('productId', { status: 'active' }),
    // returns false if another run already triggered it (prevents duplicate notifications)
    markTriggered: async (id, price) => (await PriceAlert.updateOne({ _id: id, status: 'active' },
      { $set: { status: 'triggered', triggeredAt: new Date(), triggeredPrice: price } })).modifiedCount > 0,
    addNotification: d => Notification.create(d),
    listNotifications: async userId => (await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50).lean()).map(toNote),
    markRead: async (userId, id) => (await Notification.updateOne({ _id: id, userId }, { $set: { read: true } })).matchedCount > 0,
    getUserEmail: async userId => (await User.findById(userId).lean())?.email,
  };
}
