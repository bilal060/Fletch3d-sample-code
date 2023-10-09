import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorProps } from "shared/navigators";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "shared/apis/auth/authApi";
import * as Yup from "yup";
import { LoginPayload } from "shared/types/auth/login.type";
import { useAppDispatch } from "shared/hooks/useRedux";
import { setRememberMe } from "store/slices/auth/userSignInfo";
import { setUserSignInInfo } from "store/slices/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from "@env";

type LoginPayloadWithoutType = Omit<LoginPayload, "type">;

const useSignIn = () => {
  const { navigate } = useNavigation<AuthStackNavigatorProps>();
  const [doLogin, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const [socialLogin, { error: socialError }] = useSocialLoginMutation();

  if (error && (emailError === undefined || passwordError === undefined)) {
    // @ts-ignore
    const errorResponse = JSON.parse(error.data).error;
    // @ts-ignore
    if (errorResponse.email && typeof emailError !== "string") {
      // @ts-ignore
      setEmailError(errorResponse.email);
    }
    // @ts-ignore
    if (errorResponse.password && typeof passwordError !== "string") {
      // @ts-ignore
      setPasswordError(errorResponse.password);
    }
  }

  if (error) {
    // @ts-ignore
    const errorResponse = JSON.parse(error?.data);
    if (typeof errorResponse.error === "string") {
      Alert.alert("Error", errorResponse.error);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    remember_me: Yup.boolean(),
  });

  const handleSubmitForm = (values: LoginPayloadWithoutType) => {
    const apiPayLoad: LoginPayload = { ...values, type: "email" };
    setEmailError(undefined);
    setPasswordError(undefined);
    const res = doLogin(apiPayLoad);
    const email = values.email || "";

    if ("error" in res) {
      // @ts-ignore
      if (res?.error?.data?.error?.includes("not verified")) {
        dispatch(
          setUserSignInInfo({
            user: {
              is_email_verified: false,
              email,
              verificationId: null,
            },
            token: null,
          })
        );
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("ForgotPassword");
  };

  const handleRememberMe = (value: boolean) => {
    dispatch(setRememberMe(value));
  };

  useEffect(() => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const doGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      if (res.serverAuthCode)
        socialLogin({ code: res.serverAuthCode, type: "google" });
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    validationSchema,
    handleSubmitForm,
    handleForgotPassword,
    handleRememberMe,
    emailError,
    passwordError,
    scrollRef,
    doGoogleLogin,
  };
};

export default useSignIn;
