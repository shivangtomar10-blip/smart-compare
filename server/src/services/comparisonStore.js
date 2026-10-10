import SavedComparison from '../models/SavedComparison.js';
const map = c => ({ id: String(c._id), name: c.name, items: c.items, createdAt: c.createdAt });
export function createComparisonStore() {
  return {
    list: async userId => (await SavedComparison.find({ userId }).sort({ createdAt: -1 }).lean()).map(map),
    count: userId => SavedComparison.countDocuments({ userId }),
    create: async d => map((await SavedComparison.create(d)).toObject()),
    remove: async (userId, id) => (await SavedComparison.deleteOne({ _id: id, userId })).deletedCount > 0,
  };
}
