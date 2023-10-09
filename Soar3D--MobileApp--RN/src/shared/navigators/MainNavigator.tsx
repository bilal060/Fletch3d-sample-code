import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import BottomStack from "./BottomStack";
import HomeScreens from "screens/Home/HomeScreen";
import AddScanStackNavigator from "./AddScanStackNavigator";
import ProjectStackNavigator from "./ProjectStackNavigator";
import { ProfileStackNavigator } from "./ProfileStackNavigator";
import LibraryStackNavigator from "./LibraryStackNavigator";
import { RouteProp } from "@react-navigation/native";
import ModelViewer from "screens/Shared/ModelViewer/ModelViewer";

export enum MainStackScreen {
  BOTTOM_TAB = "BottomTab",
  ADD_SCAN_STACK = "AddScanStack",
  PROJECTS_STACK = "ProjectsStack",
  PROFILE_STACK = "ProfileStack",
  LIBRARY_STACK = "LibraryStack",
  MODEL_VIEWER = "ModelViewer",
}

type MainStackNavigatorParams = {
  BottomTab: {
    screen: string;
  };
  HomeScreen: undefined;
  AddScanStack: undefined;
  ProjectsStack: undefined;
  ProfileStack: undefined;
  LibraryStack: undefined;
  ModelViewer: {
    url: string;
  };
};

export type ModelViewerRouteProps = RouteProp<
  MainStackNavigatorParams,
  "ModelViewer"
>;

export type MainStackNavigatorProps =
  NativeStackNavigationProp<MainStackNavigatorParams>;
const MainStack = createNativeStackNavigator<MainStackNavigatorParams>();

export const MainNavigator = (): JSX.Element => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={MainStackScreen.BOTTOM_TAB}
        component={BottomStack}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={MainStackScreen.ADD_SCAN_STACK}
        component={AddScanStackNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          animation: "slide_from_bottom",
        }}
      />
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreens}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <MainStack.Screen
        name={MainStackScreen.PROJECTS_STACK}
        component={ProjectStackNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <MainStack.Screen
        name={MainStackScreen.LIBRARY_STACK}
        component={LibraryStackNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <MainStack.Screen
        name={MainStackScreen.PROFILE_STACK}
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <MainStack.Screen
        name={MainStackScreen.MODEL_VIEWER}
        component={ModelViewer}
        options={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
    </MainStack.Navigator>
  );
};
