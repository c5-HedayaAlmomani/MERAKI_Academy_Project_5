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
      state.cart.push(action.payload);
    },
    // payload: id
    deleteFromCartAction: (action, payload) => {
      state.cart = state.cart.filter((element) => {
        return element.id != action.payload;
      });
    },
    // payload : none
    emptyCartAction:(state,action)=>{
        state.cart=[]
    }
  },
});

export const {
    addToCartAction,getCartAction,emptyCartAction,deleteFromCartAction
} = cart.actions

export default cart.reducer