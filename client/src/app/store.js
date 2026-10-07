import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';

// Add new slices here as features are built (cart, ui, notifications ...).
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
