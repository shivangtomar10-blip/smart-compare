import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from '../controllers/authController.js';
export default function authRoutes(secret) {
  const r = Router(), c = authController(secret);
  r.use(rateLimit({ windowMs: 15 * 60_000, limit: 20, message: { success: false, error: 'Too many attempts, try again later' } }));
  r.post('/register', c.register); r.post('/login', c.login);
  return r;
}
