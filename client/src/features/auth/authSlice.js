import { createSlice } from '@reduxjs/toolkit';

// Access token lives in memory only (safer than localStorage against XSS).
// The refresh token will be an httpOnly cookie set by the server.
const initialState = {
  user: null,
  accessToken: null,
  isAuthReady: false, // becomes true after the first "who am I?" check on page load
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.accessToken = payload.accessToken;
      state.isAuthReady = true;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthReady = true;
    },
  },
});

export const { setCredentials, setUser, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectIsAuthReady = (state) => state.auth.isAuthReady;
