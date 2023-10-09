import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Projects from "screens/Projects/Home";
import Project from "screens/Projects/Project";
import Scans from "screens/Projects/Scans";
import { Header, HeaderBackButton } from "shared/components/ui";
import { IMyScansList } from "shared/types/myScans/myScans.type";

type ProjectStackNavigatorParams = {
  ProjectHome: undefined;
  Project: {
    id: string;
  };
  Scans: {
    scans: IMyScansList[];
    activeScanId: string;
    activeRoute: string;
  };
};

export type ScansRouteProp = RouteProp<ProjectStackNavigatorParams, "Scans">;

export type ProjectRouteProps = RouteProp<
  ProjectStackNavigatorParams,
  "Project"
>;

export type ProjectStackNavigatorProps =
  NativeStackNavigationProp<ProjectStackNavigatorParams>;
const ProjectStack = createNativeStackNavigator<ProjectStackNavigatorParams>();

const ProjectStackNavigator = () => {
  const { goBack, popToTop } = useNavigation<ProjectStackNavigatorProps>();

  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen
        name="ProjectHome"
        component={Projects}
        options={{
          headerShadowVisible: false,
          header: () => <Header />,
        }}
      />
      <ProjectStack.Screen
        name="Project"
        component={Project}
        options={{
          headerLeft: () => <HeaderBackButton onPress={popToTop} />,
          headerBackVisible: false,
          headerShadowVisible: false,
        }}
      />
      <ProjectStack.Screen
        name="Scans"
        component={Scans}
        options={{ headerShown: false }}
      />
    </ProjectStack.Navigator>
  );
};

export default ProjectStackNavigator;
