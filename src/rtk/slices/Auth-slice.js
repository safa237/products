// authSlice.js (or wherever you manage your authentication state with Redux Toolkit)

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
