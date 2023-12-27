import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin(state) {
      state.isLoggedin = true;
    },
    authLogout(state) {
      state.isLoggedin = false;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;
