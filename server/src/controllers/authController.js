import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { validateRegister, validateLogin } from '../utils/validate.js';
import { signToken } from '../utils/token.js';
import { HttpError } from '../utils/errors.js';

const DUMMY = bcrypt.hashSync('not-a-real-password', 10); // equalizes timing when email is unknown
const publicUser = u => ({ id: u._id, name: u.name, email: u.email });

export const authController = secret => ({
  async register(req, res, next) {
    try {
      const { name, email, password } = validateRegister(req.body);
      if (await User.exists({ email })) throw new HttpError(409, 'An account with this email already exists');
      const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
      res.status(201).json({ success: true, token: signToken(user._id, secret), user: publicUser(user) });
    } catch (e) { next(e.code === 11000 ? new HttpError(409, 'An account with this email already exists') : e); }
  },
  async login(req, res, next) {
    try {
      const { email, password } = validateLogin(req.body);
      const user = await User.findOne({ email }).select('+passwordHash');
      const ok = await bcrypt.compare(password, user?.passwordHash || DUMMY);
      if (!user || !ok) throw new HttpError(401, 'Incorrect email or password');
      res.json({ success: true, token: signToken(user._id, secret), user: publicUser(user) });
    } catch (e) { next(e); }
  },
});
