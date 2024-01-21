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


// wishlistSlice.js

/*import { createSlice, createAction } from '@reduxjs/toolkit';

export const loadWishlistFromStorage = (userId) => {
  const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

export const saveWishlistToStorage = (userId, wishlist) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
};

export const clearWishlist = createAction('wishlist/clearWishlist');

// Define the initial state here
const initialState = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState, // Use the defined initialState
  reducers: {
    addToWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      if (!state.includes(productId)) {
        saveWishlistToStorage(userId, [...state, productId]);
        return [...state, productId];
      }
      return state;
    },
    removeFromWishlist: (state, action) => {
      const { userId, productId } = action.payload;
      const updatedWishlist = state.filter((id) => id !== productId);
      saveWishlistToStorage(userId, updatedWishlist);
      return updatedWishlist;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearWishlist, () => {
      // Clear wishlist in Redux state (handled automatically by createSlice)
      return [];
    });
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist;

export default wishlistSlice.reducer;*/
