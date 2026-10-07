// Every successful response has the same shape, so the React side can rely on it.
export const sendSuccess = (
  res,
  { statusCode = 200, message = 'Success', data = null, meta } = {},
) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};
