import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // import something from '@/features/auth/authSlice'
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // In development, /api calls go to the Express server (no CORS headaches).
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
});
