import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
  voterId: "",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getMe: (state, action) => {
      state.name = action.payload.data.name;
      state.role = action.payload.data.role;
      state.voterId = action.payload.data.voterId;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.voterId = action.payload.voterId;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.name = "";
      state.role = "";
      state.voterId = "";
      state.isAuthenticated = false;
    },
  },
});

export const { getMe, login, logout } = authSlice.actions;

export default authSlice.reducer;
