import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';
import { isProduction } from '../config/env.js';

export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// Converts known library errors into clean ApiErrors.
const normalizeError = (err) => {
  if (err instanceof ApiError) return err;

  if (err instanceof ZodError) {
    return ApiError.badRequest('Validation failed', err.flatten().fieldErrors);
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message]),
    );
    return ApiError.badRequest('Validation failed', details);
  }

  if (err instanceof mongoose.Error.CastError) {
    return ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // Mongo duplicate key (for example: email already registered)
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return ApiError.conflict(`${field} already exists`);
  }

  if (err instanceof jwt.TokenExpiredError) {
    return ApiError.unauthorized('Session expired, please log in again');
  }
  if (err instanceof jwt.JsonWebTokenError) {
    return ApiError.unauthorized('Invalid token');
  }

  return null; // unknown error (probably a bug)
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const known = normalizeError(err);

  if (!known) {
    logger.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      ...(isProduction ? {} : { stack: err.stack }),
    });
  }

  return res.status(known.statusCode).json({
    success: false,
    message: known.message,
    ...(known.details ? { errors: known.details } : {}),
  });
};
