import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

// Feature routers will be mounted here as each module is built:
//   router.use('/auth', authRoutes);
//   router.use('/products', productRoutes);
//   router.use('/orders', orderRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Glome API is running',
    uptime: Math.round(process.uptime()),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

export default router;
