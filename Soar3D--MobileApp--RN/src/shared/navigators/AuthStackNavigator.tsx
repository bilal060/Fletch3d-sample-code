import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { OutlinedButton } from "shared/components/ui";
import { RouteProp, useNavigation } from "@react-navigation/native";
import HeaderBackButton from "shared/components/ui/HeaderBackButton";

// Screens Import
import SignIn from "screens/Auth/SignIn";
import SignUp from "screens/Auth/SignUp";
import ForgotPassword from "screens/Auth/ForgotPassword";
import SocialSignUp from "screens/Auth/SocialSignUp";

type AuthStackNavigatorParams = {
  SignIn: undefined;
  SignUp: undefined;
  OnBoarding: undefined;
  ForgotPassword: undefined;
  TermsAndConditions: undefined;
  SocialSignUp: {
    code: string;
  };
};

export type SocialSignUpRouteProp = RouteProp<
  AuthStackNavigatorParams,
  "SocialSignUp"
>;

export type AuthStackNavigatorProps =
  NativeStackNavigationProp<AuthStackNavigatorParams>;
const AuthStack = createNativeStackNavigator<AuthStackNavigatorParams>();

export const AuthStackNavigator = (): JSX.Element => {
  const { goBack, navigate } = useNavigation<AuthStackNavigatorProps>();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <OutlinedButton
              label="Sign Up"
              onPress={() => navigate("SignUp")}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <OutlinedButton
              label="Sign In"
              onPress={() => navigate("SignIn")}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <OutlinedButton
              label="Sign Up"
              onPress={() => navigate("SignUp")}
            />
          ),
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton onPress={goBack} />,
        }}
      />
      <AuthStack.Screen
        name="SocialSignUp"
        component={SocialSignUp}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerRight: () => (
            <OutlinedButton
              label="Sign In"
              onPress={() => navigate("SignIn")}
            />
          ),
          headerBackVisible: false,
          headerLeft: () => <HeaderBackButton onPress={goBack} />,
        }}
      />
    </AuthStack.Navigator>
  );
};
