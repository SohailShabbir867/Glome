import http from 'node:http';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { logger } from './utils/logger.js';

// We use a plain http server (not app.listen) because Socket.IO
// for real-time chat and notifications will attach to this same server.
const server = http.createServer(app);

const start = async () => {
  await connectDB();
  server.listen(env.PORT, () => {
    logger.info(`Glome API running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });
};

const shutdown = (signal) => {
  logger.info(`${signal} received, shutting down...`);
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
  shutdown('unhandledRejection');
});

start().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
