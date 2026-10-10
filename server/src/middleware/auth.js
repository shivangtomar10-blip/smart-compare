import { verifyToken } from '../utils/token.js';
import { HttpError } from '../utils/errors.js';
// Sets req.userId from "Authorization: Bearer <jwt>".
export const requireAuth = secret => (req, _res, next) => {
  const m = /^Bearer (.+)$/.exec(req.headers.authorization || '');
  if (!m) return next(new HttpError(401, 'Authentication required'));
  try { req.userId = verifyToken(m[1], secret).sub; next(); }
  catch { next(new HttpError(401, 'Invalid or expired token')); }
};
