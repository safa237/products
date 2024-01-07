import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts= createAsyncThunk("productSlice/fetchProducts" , async () => {
    const res = await fetch ("https://mostafaben.bsite.net/api/Products");
    const data = await res.json();
    return data;
})
const productSlice = createSlice({
    initialState : [],
    name : "productSlice" , 
    reducers: {
        selectProducts: (state) => state,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload; // Make sure it's returning an array
        });
    }
})


export const selectProducts = (state) => state.products;
  export const { setFilteredProducts } = productSlice.actions;
  export const {} = productSlice.actions;
export default productSlice.reducer;