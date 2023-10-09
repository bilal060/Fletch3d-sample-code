import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Profile from "screens/Profile/Home";
import { Header, HeaderBackButton } from "shared/components/ui";

type ProfileStackNavigatorParams = {
  Profile: undefined;
};

export type ProfileStackNavigatorProps =
  NativeStackNavigationProp<ProfileStackNavigatorParams>;
const ProfileStack = createNativeStackNavigator<ProfileStackNavigatorParams>();

export const ProfileStackNavigator = (): JSX.Element => {
  const { goBack } = useNavigation();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          // header: () => <Header />,
          // headerShown: false,
          headerLeft: () => <HeaderBackButton onPress={goBack} />,
          headerTitle: "",
          title: "",
          headerBackVisible: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};
