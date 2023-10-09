import { useRegisterMutation } from "shared/apis/auth/authApi";
import * as Yup from "yup";
import { RegisterPayload } from "shared/types/auth/register.type";
import { useAppDispatch } from "shared/hooks/useRedux";
import { setUserSignInInfo } from "store/slices/auth/authSlice";
import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from "@env";
import { useNavigation } from "@react-navigation/native";
import { AuthStackNavigatorProps } from "shared/navigators";

type RegisterPayloadAPI = Pick<
  RegisterPayload,
  Exclude<keyof RegisterPayload, "confirm" | "terms_agreed">
>;

interface ValidationErros {
  full_name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  invite_code: string | undefined;
}

const useSignUp = () => {
  const [doRegister, { error }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const [validationErros, setValidationErrors] = useState<
    ValidationErros | undefined
  >();
  const { navigate } = useNavigation<AuthStackNavigatorProps>();

  if (error && validationErros === undefined) {
    // @ts-ignore
    const errorResponse = JSON.parse(error.data).error;
    setValidationErrors({
      full_name: errorResponse.full_name || undefined,
      email: errorResponse.email || undefined,
      password: errorResponse.password || undefined,
      invite_code: errorResponse.invite_code || undefined,
    });
  }

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    terms: Yup.boolean()
      .oneOf([true], "You need to agree to the terms of service")
      .required("You need to agree to the terms of service"),
    invite_code: Yup.string(),
  });

  const handleSubmitForm = (values: RegisterPayload) => {
    setValidationErrors(undefined);
    const apiPayload: RegisterPayloadAPI = values;
    if (apiPayload.invite_code === "") delete apiPayload.invite_code;

    const res = doRegister(apiPayload);
    if ("data" in res) {
      const data = res.data as { verificationId?: string };
      if (typeof data.verificationId === "string") {
        const { verificationId } = data;
        dispatch(
          setUserSignInInfo({
            user: {
              is_email_verified: false,
              email: values.email,
              verificationId,
            },
            token: null,
          })
        );
      }
    }
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

  const doGoogleRegister = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      if (res.serverAuthCode)
        navigate("SocialSignUp", { code: res.serverAuthCode });
    } catch (error: any) {
      console.error(error);
    }
  };

  return {
    validationSchema,
    handleSubmitForm,
    error,
    validationErros,
    doGoogleRegister,
  };
};

export default useSignUp;
