import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { logout } from "store/slices/auth/authSlice";
import { setLoggedIn, setRememberMe } from "store/slices/auth/userSignInfo";

export const logOut = (
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>
) => {
  dispatch(logout());
  dispatch(setLoggedIn(false));
  dispatch(setRememberMe(false));
};
