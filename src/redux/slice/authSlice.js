import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  useName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      const { email, userName, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.useName = userName;
      state.userID = userID;
    },
    REMOVE_ACVTIVE_USER: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.useName = null;
      state.userID = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACVTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const email = (state) => state.auth.email;
export const useName = (state) => state.auth.useName;
export const userID = (state) => state.auth.userID;

export default authSlice.reducer;
