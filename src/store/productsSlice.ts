import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "../services/api";
import type { Product } from "../types/product";

type ProductsState = {
  items: Product[];
  byId: Record<number, Product | undefined>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};

const initialState: ProductsState = {
  items: [],
  byId: {},
  status: "idle",
};

export const loadProducts = createAsyncThunk("products/loadAll", async () => {
  return await fetchAllProducts();
});

export const loadProduct = createAsyncThunk(
  "products/loadById",
  async (id: number) => {
    return await fetchProductById(id);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        for (const p of action.payload) state.byId[p.id] = p;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        const p = action.payload;
        state.byId[p.id] = p;
      });
  },
});

export default productsSlice.reducer;
