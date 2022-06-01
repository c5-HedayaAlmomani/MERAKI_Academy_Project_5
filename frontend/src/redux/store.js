import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";

import productsReducer from "./reducers/products";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});
