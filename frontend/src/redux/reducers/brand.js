import { createSlice } from "@reduxjs/toolkit";

export const brands = createSlice({
  name: "category",
  initialState: {
    brands: [],
  },
  reducers: {
    // payload :array of Brands [Brands]
    getBrandsAction: (state, action) => {
      state.category = action.payload;
    },
    // payload : Brand object {Brand}
    addToBrandAction: (state, action) => {
      state.category.push(action.payload);
    },
    // payload: id
    deleteFromBrand: (state, action) => {
      state.category = state.category.filter((element) => {
        return element.id != action.payload;
      });
    },
  },
});

export const { getBrandsAction, addToBrandAction, deleteFromBrand } =
  brands.actions;

export default brands.reducer;
