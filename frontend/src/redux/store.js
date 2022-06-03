import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";

import productsReducer from "./reducers/products";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart : cartReducer
  },
});
