import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
  isLoggedIn: false,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.token = action.payload.accessToken;
      state.userData = action.payload.user;
      state.isLoggedIn = true;
    },
    setToken: (state, action) => {
      state.token = action.payload.accessToken;
    },
    logout: () => initialState,
  },
});

export const authActions = authSlice.actions;
