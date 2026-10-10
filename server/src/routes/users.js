import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { userController as c } from '../controllers/userController.js';
export default function userRoutes(secret) {
  const r = Router();
  r.use(requireAuth(secret));
  r.get('/me', c.me); r.patch('/me', c.updateMe);
  r.get('/wishlist', c.getWishlist); r.post('/wishlist', c.addWishlist); r.delete('/wishlist/:productId', c.removeWishlist);
  r.get('/recent', c.getRecent); r.post('/recent', c.addRecent);
  return r;
}
