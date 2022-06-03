import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    // payload :array of products [products]
    getCartAction: (state, action) => {
      state.cart = action.payload;
    },
    // payload : product object {product}
    addToCartAction: (state, action) => {

    //   console.log("action", action.payload[0]);
    //   const isInserted = state.cart.map((element, index) => {
    //     console.log(element.id);
    //     console.log(element.id == action.payload[0].id);

    //     return element.id == action.payload[0].id;
    //   });
    //   console.log("isInsert", isInserted);

    //   if (isInserted) {

    //   }else{
          
    //   }
      state.cart.push(action.payload);
    },
    // payload: id
    deleteFromCartAction: (state, action) => {
      state.cart = state.cart.filter((element) => {
        return element.id != action.payload;
      });
    },
    // payload : none
    emptyCartAction: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  addToCartAction,
  getCartAction,
  emptyCartAction,
  deleteFromCartAction,
} = cart.actions;

export default cart.reducer;
