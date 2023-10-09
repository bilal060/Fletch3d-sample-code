import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthSliceStates } from "shared/types/auth/authSlice.type";

const initialState: IAuthSliceStates = {
  user: null,
  token: null,
  userProfile: null,
  showOnBoarding: true,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserSignInInfo(
      state,
      action: PayloadAction<Omit<IAuthSliceStates, "showOnBoarding">>
    ) {
      state.user = action.payload.user;
      if (action.payload.token) state.token = action.payload.token;
      if (action.payload.userProfile)
        state.userProfile = action.payload.userProfile;
    },
    setUserDetailInfo(
      state,
      { payload }: PayloadAction<IAuthSliceStates["user"]>
    ) {
      state.user = {
        ...state.user,
        ...payload,
      } as any;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    setShowOnBoarding(state, { payload }: PayloadAction<boolean>) {
      state.showOnBoarding = payload;
    },
  },
});

export default authSlice.reducer;

export const {
  setUserSignInInfo,
  setUserDetailInfo,
  logout,
  setShowOnBoarding,
} = authSlice.actions;
