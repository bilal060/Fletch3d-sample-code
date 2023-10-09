import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProjectStackNavigator from "./ProjectStackNavigator";
import { Alert, TouchableOpacity, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MainStackNavigatorProps } from "./MainNavigator";
import AddScanStackNavigator from "./AddScanStackNavigator";
import LibraryStackNavigator from "./LibraryStackNavigator";
import { Folder, IconScan, VideoCamera } from "assets/icons";
import { useAppSelector } from "shared/hooks/useRedux";
import { IUserData } from "shared/types/auth/user.type";

const Tab = createBottomTabNavigator();

export enum BottomTabRoutes {
  // HOME = "Home",
  PROJECTS = "Projects",
  ADD_SCAN = "AddScan",
  VIDEOS = "Videos",
}

export const tabBarStyles: ViewStyle = {
  // height: "8.5%",
  position: "absolute",
  bottom: 18,
  borderRadius: 30,
  marginHorizontal: "5.3%",
  paddingHorizontal: "15%",
  paddingTop: "5%",
  paddingBottom: "5%",
  // width: "100%",
  height: "7%",
  shadowColor: "#000000",
  alignSelf: "center",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.17,
  shadowRadius: 2.54,
  elevation: 3,
};

export default function BottomStack() {
  const { navigate } = useNavigation<MainStackNavigatorProps>();
  const scanCredits = useAppSelector(
    (state) => (state.auth.user as IUserData).scan_credit
  );

  return (
    // <SafeAreaView>
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          ...tabBarStyles,
        },
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="cover"
              source={HomeUnselectIcon}
              style={{
                tintColor: focused ? "#7680FF" : "#E1E1E4",
              }}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name={BottomTabRoutes.VIDEOS}
        component={LibraryStackNavigator}
        options={{
          tabBarLabel: "Videos",
          tabBarIcon: ({ focused }) => (
            <VideoCamera color={focused ? "#7680FF" : "#E1E1E4"} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.ADD_SCAN}
        component={AddScanStackNavigator}
        options={{
          tabBarLabel: "AddScans",
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (scanCredits > 0) {
                  navigate("AddScanStack");
                } else {
                  Alert.alert("You don't have enough scan credits");
                }
              }}
            />
          ),
          tabBarIcon: () => (
            <IconScan
              style={{
                bottom: "50%",
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 3.05,
                elevation: 4,
              }}
            />
          ),
          // header: () => <Header />,
          tabBarStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={BottomTabRoutes.PROJECTS}
        component={ProjectStackNavigator}
        options={{
          tabBarLabel: "Projects",
          tabBarIcon: ({ focused }) => (
            <Folder
              color={focused ? "#7680FF" : "#E1E1E4"}
              width={24}
              height={24}
            />
          ),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Setting"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="cover"
              source={PeopleUnselectIcon}
              style={{
                tintColor: focused ? "#7680FF" : "#E1E1E4",
              }}
            />
          ),
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
    // </SafeAreaView>
  );
}
