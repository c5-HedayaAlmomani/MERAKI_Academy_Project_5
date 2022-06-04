import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    // payload :array of users [users]
    getUsersAction: (state, action) => {
      state.users = action.payload;
    },
 //payload :{id}    
    addToUsersAction: (state, action) => {
        state.users = state.users.map((e) => {
            if (e.id == action.payload.id) {
              return action.payload.neUser;
            }
            return e;
      })},
    // payload: id
    deleteFromUsers: (state, action) => {
      state.users = state.users.filter((element) => {
        return element.id != action.payload;
      });
    },
  },
});

export const { getUsersAction, addToUsersAction, deleteFromUsers } =
users.actions;

export default users.reducer;
