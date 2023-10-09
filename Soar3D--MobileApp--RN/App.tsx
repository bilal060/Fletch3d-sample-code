import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "./src/shared/navigators";
import RNBootSplash from "react-native-bootsplash";
import SplashScreen from "react-native-splash-screen";
import { Platform } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "shared/hooks/useRedux";
import { useVerifyTokenQuery } from "shared/apis/auth/authApi";
import { setLoggedIn } from "store/slices/auth/userSignInfo";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import VerifyOTP from "screens/Auth/VerifyOTP";
import { logOut } from "shared/utils/auth";
import { MainNavigator } from "shared/navigators/MainNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import OnBoarding from "screens/Auth/OnBoarding/OnBoarding";

function AuthApp(): JSX.Element {
  const { isLoggedIn, userDetails, rememberMe, token, showOnBoarding } =
    useAppSelector((state) => ({
      isLoggedIn: state.userSignInfo.isLoggedIn,
      userDetails: state.auth.user,
      rememberMe: state.userSignInfo.rememberMe,
      token: state.auth.token,
      showOnBoarding: state.auth.showOnBoarding,
    }));

  const dispatch = useAppDispatch();

  const { data, error } = useVerifyTokenQuery(undefined, {
    skip: isLoggedIn,
  });

  useEffect(() => {
    if (!rememberMe && userDetails?.is_email_verified && userDetails !== null) {
      logOut(dispatch);
    } else if (data && !isLoggedIn) {
      dispatch(setLoggedIn(true));
    } else if (error) {
      logOut(dispatch);
    }
  }, [data, error]);

  useEffect(() => {
    if (
      data &&
      !isLoggedIn &&
      userDetails !== null &&
      !userDetails.in_waiting_list &&
      !userDetails?.is_email_verified
    ) {
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);

  if (userDetails && !userDetails.is_email_verified) {
    let verificationId: string | null = null;

    if ("verificationId" in userDetails) {
      verificationId = userDetails.verificationId;
    }

    return (
      <VerifyOTP email={userDetails.email} verificationId={verificationId} />
    );
  }

  if (isLoggedIn && userDetails) {
    if (userDetails && userDetails?.in_waiting_list) {
      logOut(dispatch);
      return <AuthStackNavigator />;
    }
    return <MainNavigator />;
  } else if (showOnBoarding) return <OnBoarding />;
  else return <AuthStackNavigator />;
}

function App(): JSX.Element {
  const onReady = () => {
    if (Platform.OS === "ios") {
      RNBootSplash.hide();
    } else {
      SplashScreen.hide();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              <NavigationContainer onReady={onReady}>
                <AuthApp />
              </NavigationContainer>
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
