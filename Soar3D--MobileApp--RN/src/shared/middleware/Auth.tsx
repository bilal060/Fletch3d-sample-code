import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/hooks/useRedux";
import { useVerifyTokenQuery } from "shared/apis/auth/authApi";
import { logout } from "store/slices/auth/authSlice";
import { setLoggedIn } from "store/slices/auth/userSignInfo";
import { useNavigation } from "@react-navigation/native";

const Auth = () => {
  const [Component, setComponent] = useState(null);
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  const { isLoggedIn, userDetails } = useAppSelector((state) => ({
    isLoggedIn: state.userSignInfo.isLoggedIn,
    userDetails: state.auth.user,
  }));

  const { data, error } = useVerifyTokenQuery(undefined, {
    skip: isLoggedIn,
  });

  useEffect(() => {
    if (data && !isLoggedIn) {
      dispatch(setLoggedIn(true));
      // automatically switches to Home Stack Navigator
    }
    if (isLoggedIn) {
      // automatically switches to Home Stack Navigator
    }
  }, [data, isLoggedIn, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(logout());
    }
  }, [error, dispatch, navigate]);

  useEffect(() => {
    if (!userDetails) {
    }
  }, [userDetails, navigate]);

  return Component;
};

export default Auth;
