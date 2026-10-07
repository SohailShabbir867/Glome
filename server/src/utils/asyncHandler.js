// Wraps async route handlers so thrown errors go to the error middleware.
// Without this, every controller would need its own try/catch.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
