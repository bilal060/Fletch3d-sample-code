import { useRoute } from "@react-navigation/native";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Text } from "shared/components/ui";
import { ProjectRouteProps } from "shared/navigators/ProjectStackNavigator";
import useProject from "./useProject";
import LibraryListItem from "shared/components/Library/LibraryListItem";
import EmptyScreen from "shared/components/ui/EmptyScreen";

type FolderNamesProps = {
  name: string;
  handleOnPress: () => void;
  isActive: boolean;
};

const FolderNamesItem = ({
  name,
  handleOnPress,
  isActive,
}: FolderNamesProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[
        styles.folderNameContainer,
        isActive && styles.activeFolderContainer,
      ]}
    >
      <Text
        style={[
          styles.folderNameContainer,
          isActive && styles.activeFolderName,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const Project = (): JSX.Element => {
  const {
    params: { id },
  } = useRoute<ProjectRouteProps>();
  const {
    folderNames,
    activeFolderKey,
    handleChangeFolder,
    scans,
    handleOpenScan,
  } = useProject(id);
  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.root}>
      <View>
        <FlatList
          horizontal
          data={folderNames}
          renderItem={({ item, index }) => (
            <FolderNamesItem
              key={index}
              name={item}
              handleOnPress={() => handleChangeFolder(item)}
              isActive={item === activeFolderKey}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
      <View style={styles.scansContainer}>
        {scans?.length !== 0 ? (
          <FlatList
            data={scans}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.libaryListItemContainer,
                  { minWidth: width * 0.43 },
                ]}
              >
                <LibraryListItem
                  key={index}
                  name={item.name}
                  image={item.thumbnail}
                  style={{ width: width * 0.4, height: height * 0.3 }}
                  onPress={() => handleOpenScan(item.id)}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            extraData={true}
            contentContainerStyle={styles.scansFlatListContentContainer}
          />
        ) : null}
      </View>
      {scans?.length === 0 && (
        <EmptyScreen label="No scans so far" style={{ width, height }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  flatListContainer: {
    alignSelf: "flex-start",
  },
  scansContainer: {
    alignSelf: "flex-start",
    marginTop: 20,
    flex: 1,
  },
  folderNameContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexWrap: "nowrap",
    alignSelf: "flex-start",
  },
  folderName: {
    fontSize: 12,
    color: "#9E9E9E",
  },
  activeFolderContainer: {
    borderBottomColor: "#5E5D5D",
    borderBottomWidth: 1,
  },
  activeFolderName: {
    color: "#5E5D5D",
  },
  scansFlatListContentContainer: {
    paddingBottom: "25%",
    width: "100%",
  },
  libaryListItemContainer: {
    flexDirection: "column",
    marginTop: "0.4%",
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

export default Project;
