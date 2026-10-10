import User from '../models/User.js';
import Wishlist from '../models/Wishlist.js';
import { validateProductRef } from '../utils/validate.js';
import { HttpError } from '../utils/errors.js';

export const userController = {
  async me(req, res, next) {
    try {
      const u = await User.findById(req.userId);
      if (!u) throw new HttpError(404, 'User not found');
      res.json({ success: true, user: { id: u._id, name: u.name, email: u.email, createdAt: u.createdAt } });
    } catch (e) { next(e); }
  },
  async updateMe(req, res, next) {
    try {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      if (name.length < 2 || name.length > 60) throw new HttpError(400, 'Name must be 2-60 characters');
      const u = await User.findByIdAndUpdate(req.userId, { name }, { new: true });
      if (!u) throw new HttpError(404, 'User not found');
      res.json({ success: true, user: { id: u._id, name: u.name, email: u.email } });
    } catch (e) { next(e); }
  },
  async getWishlist(req, res, next) {
    try { const w = await Wishlist.findOne({ userId: req.userId }); res.json({ success: true, items: w?.items || [] }); }
    catch (e) { next(e); }
  },
  async addWishlist(req, res, next) {
    try {
      const item = validateProductRef(req.body);
      const w = (await Wishlist.findOne({ userId: req.userId })) || new Wishlist({ userId: req.userId });
      if (w.items.some(i => i.productId === item.productId)) throw new HttpError(409, 'Already in wishlist');
      if (w.items.length >= 200) throw new HttpError(400, 'Wishlist is full (200 items)');
      w.items.push(item); await w.save();
      res.status(201).json({ success: true, items: w.items });
    } catch (e) { next(e); }
  },
  async removeWishlist(req, res, next) {
    try {
      const w = await Wishlist.findOneAndUpdate({ userId: req.userId },
        { $pull: { items: { productId: req.params.productId } } }, { new: true });
      res.json({ success: true, items: w?.items || [] });
    } catch (e) { next(e); }
  },
  async getRecent(req, res, next) {
    try { const u = await User.findById(req.userId); res.json({ success: true, items: u?.recentlyViewed || [] }); }
    catch (e) { next(e); }
  },
  async addRecent(req, res, next) {
    try {
      const { productId, title, image } = validateProductRef(req.body);
      const u = await User.findById(req.userId);
      if (!u) throw new HttpError(404, 'User not found');
      u.recentlyViewed = [{ productId, title, image, viewedAt: new Date() },
        ...u.recentlyViewed.filter(r => r.productId !== productId)].slice(0, 20);
      await u.save();
      res.json({ success: true, items: u.recentlyViewed });
    } catch (e) { next(e); }
  },
};
