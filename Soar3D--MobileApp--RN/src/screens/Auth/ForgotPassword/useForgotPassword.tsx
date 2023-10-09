import { useEffect, useRef, useState } from "react";
import { Animated, Keyboard } from "react-native";
import { useForgotPasswordMutation } from "shared/apis/auth/authApi";
import { ForgotPasswordPayload } from "shared/types/auth/forgotPassword.type";
import * as Yup from "yup";

const useForgotPassword = () => {
  const [isSecondaryEmail, setSecondaryEmail] = useState<boolean>(false);
  const [doForgotPassword, { error, isLoading, data }] =
    useForgotPasswordMutation();
  const [emailError, setEmailError] = useState<string | undefined>();

  if (error && emailError === undefined) {
    // @ts-ignore
    const errorResponse = JSON.parse(error.data).error;
    if (errorResponse.email && typeof emailError !== "string") {
      setEmailError(errorResponse.email);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  const handleSubmitForm = (values: ForgotPasswordPayload) => {
    setEmailError(undefined);
    doForgotPassword(values);
  };

  const toggleSecondaryEmail = () => {
    setSecondaryEmail(!isSecondaryEmail);
  };

  return {
    isSecondaryEmail,
    toggleSecondaryEmail,
    handleSubmitForm,
    validationSchema,
    emailError,
  };
};

export default useForgotPassword;
