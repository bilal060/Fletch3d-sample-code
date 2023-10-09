import { createSlice } from "@reduxjs/toolkit";

interface Props {
  isLoggedIn: boolean;
  rememberMe: boolean;
}

const initialState: Props = {
  isLoggedIn: false,
  rememberMe: false,
};

const userSignInfoSlice = createSlice({
  name: "userSignInfo",
  initialState,
  reducers: {
    setLoggedIn(state, { payload }) {
      state.isLoggedIn = payload;
    },
    setRememberMe(state, { payload }) {
      state.rememberMe = payload;
    },
  },
});

export default userSignInfoSlice.reducer;

export const { setLoggedIn, setRememberMe } = userSignInfoSlice.actions;
