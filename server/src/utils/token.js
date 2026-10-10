import jwt from 'jsonwebtoken';
export const signToken = (userId, secret, expiresIn = '7d') => jwt.sign({ sub: String(userId) }, secret, { expiresIn, algorithm: 'HS256' });
export const verifyToken = (token, secret) => jwt.verify(token, secret, { algorithms: ['HS256'] });
