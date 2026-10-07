import { asyncHandler } from '../utils/asyncHandler.js';

// Usage: router.post('/', validate({ body: createProductSchema }), controller)
// Parsed (and cleaned) values are placed on req.validated.
// We do not overwrite req.query because it is read-only in Express 5.
export const validate = (schemas) =>
  asyncHandler(async (req, res, next) => {
    req.validated = {};

    if (schemas.body) req.validated.body = await schemas.body.parseAsync(req.body);
    if (schemas.query) req.validated.query = await schemas.query.parseAsync(req.query);
    if (schemas.params) req.validated.params = await schemas.params.parseAsync(req.params);

    next();
  });
