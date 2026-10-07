import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.model.js';
import { USER_STATUS } from '../constants/roles.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const extractToken = (req) => {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.split(' ')[1];
  return req.cookies?.accessToken || null;
};

// 1) Is the person logged in?
export const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);
  if (!token) throw ApiError.unauthorized();

  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);

  const user = await User.findById(payload.sub);
  if (!user) throw ApiError.unauthorized('User no longer exists');
  if (user.status === USER_STATUS.BLOCKED) throw ApiError.forbidden('Your account is blocked');
  if (user.changedPasswordAfter(payload.iat)) {
    throw ApiError.unauthorized('Password was changed, please log in again');
  }

  req.user = user;
  next();
});

// 2) Does the logged-in person have the right role?
// Usage: router.get('/orders', protect, authorize(ROLES.SALES, ROLES.ADMIN), handler)
export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!allowedRoles.includes(req.user.role)) return next(ApiError.forbidden());
    return next();
  };
