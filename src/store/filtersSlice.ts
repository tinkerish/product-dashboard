import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FiltersState = {
  search: string;
  category: string | "all";
  sort: "price-asc" | "price-desc" | "none";
};

const initialState: FiltersState = {
  search: "",
  category: "all",
  sort: "none",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setCategory(state, action: PayloadAction<string | "all">) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<"price-asc" | "price-desc" | "none">) {
      state.sort = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setCategory, setSort, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
