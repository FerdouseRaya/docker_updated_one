import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    addUsers: (state, action) => {
      state.users.push({
        books: action.payload,
      });
    },
    updateUserInfo: (state, action) => {
      const updatedUser = action.payload;
      const updatedIndex = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );

      if (updatedIndex !== -1) {
        const updatedUsers = [...state.users];
        updatedUsers[updatedIndex] = updatedUser;
        state.users = updatedUsers;
      }
    },
    deleteUserByID: (state, action) => {
      const userIDToDelete = action.payload;
      const updatedUsers = state.users.filter(
        (user) => user._id !== userIDToDelete
      );
      state.users = updatedUsers;
    },
  },
});
export const { getUsers, addUsers, updateUserInfo, deleteUserByID } =
  userSlice.actions;
export default userSlice.reducer;
