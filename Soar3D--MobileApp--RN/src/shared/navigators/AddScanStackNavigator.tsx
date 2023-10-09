import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Header, HeaderBackButton } from "shared/components/ui";
import Video from "screens/AddScan/Video";
import { VideoFile } from "react-native-vision-camera";
import VideoScanDeatil from "screens/AddScan/VideoScanDeatil";
import MapViewScreen from "screens/AddScan/MapView";

type AddScanStackNavigatorParams = {
  AddVideos: undefined;
  VideoScanDeatil: {
    videoUrl: VideoFile;
  };
  MapViewScreen: undefined;
};

export type VideoScanDetailRouteProp = RouteProp<
  AddScanStackNavigatorParams,
  "VideoScanDeatil"
>;

export type AddScanStackNavigatorProps =
  NativeStackNavigationProp<AddScanStackNavigatorParams>;
const AddScanStack = createNativeStackNavigator<AddScanStackNavigatorParams>();

const AddScanStackNavigator = () => {
  return (
    <AddScanStack.Navigator>
      <AddScanStack.Screen
        name="AddVideos"
        component={Video}
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <AddScanStack.Screen
        name="VideoScanDeatil"
        component={VideoScanDeatil}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          gestureEnabled: false,
        }}
      />
      <AddScanStack.Screen
        name="MapViewScreen"
        component={MapViewScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          gestureEnabled: false,
        }}
      />
    </AddScanStack.Navigator>
  );
};

export default AddScanStackNavigator;
