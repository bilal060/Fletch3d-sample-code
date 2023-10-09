import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Scans from "screens/Projects/Scans";
import { Header } from "shared/components/ui";
import { IMyScansList } from "shared/types/myScans/myScans.type";
import LibraryScreen from "screens/Library/LibraryHome";
import { IPost } from "shared/types/feed/post.type";
import Posts from "screens/Library/Posts";

type LibraryStackNavigatorParams = {
  LibraryHome: undefined;
  Scans: {
    scans: IMyScansList[];
    activeScanId: string;
    activeRoute: string;
  };
  Posts: {
    posts: IPost[];
    activePostId: string;
  };
};

export type ScansRouteProp = RouteProp<LibraryStackNavigatorParams, "Scans">;
export type PostsRouteProp = RouteProp<LibraryStackNavigatorParams, "Posts">;

export type LibraryStackNavigatorProps =
  NativeStackNavigationProp<LibraryStackNavigatorParams>;
const LibraryStack = createNativeStackNavigator<LibraryStackNavigatorParams>();

const LibraryStackNavigator = () => {
  //   const { goBack, popToTop } = useNavigation<LibraryStackNavigatorProps>();

  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{
          headerShadowVisible: false,
          header: () => <Header title="My Scans" />,
        }}
      />
      <LibraryStack.Screen
        name="Scans"
        component={Scans}
        options={{ headerShown: false }}
      />
      <LibraryStack.Screen
        name="Posts"
        component={Posts}
        options={{ headerShown: false }}
      />
    </LibraryStack.Navigator>
  );
};

export default LibraryStackNavigator;
