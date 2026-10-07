import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { env, isProduction } from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Needed when running behind Nginx / a cloud proxy so rate limiting sees the real IP.
if (isProduction) app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true, // allows the refresh-token cookie
  }),
);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(hpp());

if (!isProduction) app.use(morgan('dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later' },
  }),
);

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
