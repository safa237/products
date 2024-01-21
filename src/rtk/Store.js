import { configureStore } from '@reduxjs/toolkit';
import translationSlice from './slices/Translate-slice';
import ProductSlice from './slices/Product-slice';
import WishlistSlice from './slices/Wishlist-slice';
import cartSlice from './slices/Cart-slice';
import SearchSlice from './slices/Search-slice';
import AuthSlice from './slices/Auth-slice';
import UserSlice from './slices/User-slice';

const store = configureStore({
  reducer: {
    translation: translationSlice,
    products : ProductSlice,
    wishlist: WishlistSlice,
    cart: cartSlice,
    search: SearchSlice,
    auth: AuthSlice,
    user : UserSlice,
  },
});

export default store;
