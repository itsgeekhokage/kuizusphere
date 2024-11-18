/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user@kuizo")) || null;
    } catch {
      return null;
    }
  })(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      try {
        sessionStorage.setItem("user@kuizo", JSON.stringify(action.payload));
        console.log("user savd")
      } catch (e) {
        console.error("Failed to save user data to sessionStorage", e);
      }
    },
    clearUser: (state) => {
      state.user = null;
      try {
        sessionStorage.removeItem("user@kuizo");
      } catch (e) {
        console.error("Failed to remove user data from sessionStorage", e);
      }
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
