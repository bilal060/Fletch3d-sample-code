import { SOCIAL_REDIRECT_URI_PROD } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSocialRegisterMutation } from "shared/apis/auth/authApi";
import { AuthStackNavigatorProps } from "shared/navigators";

type FormData = {
  invite_code: string | undefined;
  terms: boolean;
};

const useSocialSignUp = (code: string) => {
  const [socialSignUp, { error }] = useSocialRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    invite_code: "",
    terms: false,
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { navigate } = useNavigation<AuthStackNavigatorProps>();

  if (error) {
    console.error(error);
  }

  const handleInviteCodeChange = (text: string) => {
    setFormData({
      ...formData,
      invite_code: text,
    });
  };

  const handleTermsCheck = () => {
    setFormData({
      ...formData,
      terms: !formData.terms,
    });
  };

  const doGoogleRegister = () => {
    if (formData.invite_code)
      socialSignUp({
        code,
        invite_code: formData.invite_code,
        terms: formData.terms,
        type: "google",
      });
    else {
      socialSignUp({
        code,
        terms: formData.terms,
        type: "google",
      });
      navigate("SignIn");
    }
  };

  return {
    doGoogleRegister,
    formData,
    handleInviteCodeChange,
    handleTermsCheck,
    errorMessage,
  };
};

export default useSocialSignUp;
