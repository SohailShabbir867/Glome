import { createSlice } from '@reduxjs/toolkit';

const loadInitialUser = () => {
  try {
    const saved = localStorage.getItem('glome_user');
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return {
    id: 'usr-admin-1',
    name: 'Sohail Shabbir',
    email: 'sohail@glome.com',
    role: 'admin',
    title: 'Administrator',
  };
};

const initialState = {
  user: loadInitialUser(),
  accessToken: 'mock-auth-jwt',
  isAuthReady: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isAuthReady = true;
      try {
        localStorage.setItem('glome_user', JSON.stringify(payload.user));
      } catch {
        // ignore
      }
    },
    setUser: (state, { payload }) => {
      state.user = payload;
      try {
        localStorage.setItem('glome_user', JSON.stringify(payload));
      } catch {
        // ignore
      }
    },
    switchRole: (state, { payload }) => {
      if (payload === 'sales') {
        state.user = {
          id: 'usr-sales-1',
          name: 'Ali Raza',
          email: 'ali.raza@glome.com',
          role: 'sales',
          title: 'Salesman',
        };
      } else {
        state.user = {
          id: 'usr-admin-1',
          name: 'Sohail Shabbir',
          email: 'sohail@glome.com',
          role: 'admin',
          title: 'Administrator',
        };
      }
      try {
        localStorage.setItem('glome_user', JSON.stringify(state.user));
      } catch {
        // ignore
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthReady = true;
      try {
        localStorage.removeItem('glome_user');
      } catch {
        // ignore
      }
    },
  },
});

export const { setCredentials, setUser, switchRole, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthReady = (state) => state.auth.isAuthReady;
