// authSlice.js
/*import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;*/

// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Read the token from localStorage
const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;