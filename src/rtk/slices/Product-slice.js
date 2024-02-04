/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts= createAsyncThunk("productSlice/fetchProducts" , async () => {
    const res = await fetch ("https://ecommerce-1-q7jb.onrender.com/api/v1/public/product/en/all");
    const data = await res.json();
    return data;
})
const productSlice = createSlice({
    initialState : { products: [] },
    name : "productSlice" , 
    reducers: {
        selectProducts: (state) => state,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return { ...state, products: action.payload };
        });
    }
})


export const selectProducts = (state) => state.products;
  export const { setFilteredProducts } = productSlice.actions;
  export const {} = productSlice.actions;
export default productSlice.reducer;*/




// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectLanguage } from './Translate-slice';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Define an async thunk to fetch products
/*export const fetchProducts = createAsyncThunk('products/fetchProducts'
, async () => {
  try {
    const response = await axios.get('https://ecommerce-1-q7jb.onrender.com/api/v1/public/product/en/all');
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
});*/

// In your products slice file
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { getState }) => {
  try {
    const language = selectLanguage(getState());
    console.log('Language:', language); 
    const response = await axios.get(`https://ecommerce-1-q7jb.onrender.com/api/v1/public/product/en/all`);
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
});



// Create a slice with reducers and actions
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});



// Export the reducer
export default productSlice.reducer;
export const { setProducts } = productSlice.actions;
export const selectProducts = (state) => state.products;
  export const { setFilteredProducts } = productSlice.actions;
  export const {} = productSlice.actions;





