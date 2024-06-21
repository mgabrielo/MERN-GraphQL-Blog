import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  userData: null,
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
      state.userData = null;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { authLogin, authLogout, setUserData } = authSlice.actions;

export default authSlice.reducer;
