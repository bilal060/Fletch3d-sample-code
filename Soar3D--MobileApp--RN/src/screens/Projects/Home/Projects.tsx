import {
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { ImageBackground, Text } from "shared/components/ui";
import useProjects from "./useProjects";
import EmptyScreen from "shared/components/ui/EmptyScreen";
import { useStatusBar } from "shared/hooks/useStatusBar";

type RenderItemProps = {
  image: ImageSourcePropType;
  name: string;
  height: number;
  id: string;
  navigateToProject: (id: string) => void;
};

const gradientProps = {
  colors: ["rgba(0, 0, 0, 0.00)", "rgba(0, 0, 0, 0.64)"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
};

const RenderItem = ({
  name,
  image,
  height,
  id,
  navigateToProject,
}: RenderItemProps) => {
  return (
    <TouchableOpacity onPress={() => navigateToProject(id)}>
      <ImageBackground
        source={image}
        gradientProps={gradientProps}
        style={{
          height,
          padding: 12,
          marginVertical: 6,
          justifyContent: "flex-end",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <Text style={styles.text}>{name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Projects = () => {
  const { height, width } = useWindowDimensions();
  const { projects, navigateToProject } = useProjects();
  useStatusBar("dark-content");

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Projects</Text>
      {projects && projects.length !== 0 ? (
        <FlatList
          data={projects}
          contentContainerStyle={{ paddingBottom: height * 0.15 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RenderItem
              {...item}
              key={index}
              height={height * 0.25}
              navigateToProject={navigateToProject}
            />
          )}
        />
      ) : (
        <EmptyScreen label="No projects to show" style={{ width, height }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: "5.3%",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  heading: {
    fontSize: 16,
    color: "#7680FF",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  imageContainer: {
    padding: 12,
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#fff",
  },
});

export default Projects;
