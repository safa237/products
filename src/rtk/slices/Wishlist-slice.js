// Wishlist-slice.js

import { createSlice , createAction} from '@reduxjs/toolkit';

const localStorageKey = 'wishlist';

const loadWishlistFromStorage = () => {
  const storedWishlist = localStorage.getItem(localStorageKey);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const saveWishlistToStorage = (wishlist) => {
  localStorage.setItem(localStorageKey, JSON.stringify(wishlist));
};

export const clearWishlist = createAction('wishlist/clearWishlist');


// Define the initial state here
const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState, // Use the defined initialState
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.includes(productId)) {
  
        saveWishlistToStorage([...state, productId]);
        return [...state, productId];
      }
      return state;
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      const updatedWishlist = state.filter((id) => id !== productId);
      saveWishlistToStorage(updatedWishlist);
      return updatedWishlist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearWishlist, () => {
      saveWishlistToStorage([]); 
      return []; 
    });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist;

export default wishlistSlice.reducer;
