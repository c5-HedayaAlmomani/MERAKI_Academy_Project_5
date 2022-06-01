import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("tolen"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    loginAction: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
      state.isLoggedIn = true;
    },

    logoutAction: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logoutAction, loginAction } = auth.actions;

export default auth.reducer;
