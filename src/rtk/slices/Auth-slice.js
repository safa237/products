
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    email: null,
    token : null,
    id : null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
  },
});

export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
