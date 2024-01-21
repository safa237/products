
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
