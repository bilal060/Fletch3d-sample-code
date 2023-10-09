import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  PixelRatio,
} from "react-native";
import useLibrary from "./useLibrary";
import useThemeImages from "assets/images";
import LibraryType from "shared/components/Library/LibraryType";
import LibraryListItem from "shared/components/Library/LibraryListItem";
import EmptyScreen from "shared/components/ui/EmptyScreen";
import { useStatusBar } from "shared/hooks/useStatusBar";
import { Document, PlayOutline, Star } from "assets/icons";
import { WebView } from "react-native-webview";

const Library = () => {
  const { selectLibraryType, libraryType, scans, onClick, ScansSections } =
    useLibrary();
  const { DefaultScanImage } = useThemeImages();
  const { width, height } = useWindowDimensions();
  useStatusBar("dark-content");

  return (
    <View style={styles.parentContainer}>
      <View style={styles.libraryTypesConainer}>
        <LibraryType
          selectLibraryType={selectLibraryType}
          Icon={PlayOutline}
          name="My Scans"
          selectName={libraryType}
        />
        <LibraryType
          selectLibraryType={selectLibraryType}
          Icon={Document}
          name="My Post"
          selectName={libraryType}
        />
        <LibraryType
          selectLibraryType={selectLibraryType}
          Icon={Star}
          name="My Starred"
          selectName={libraryType}
        />
      </View>
      {scans && scans.length && scans.length !== 0 ? (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={scans}
            renderItem={({ item, index }) => (
              <View
                style={[styles.listContainer, { minWidth: width * 0.44 }]}
                key={index.toString()}
              >
                <LibraryListItem
                  name={item?.scan_name}
                  image={
                    item?.input_videos[0].thumbnail
                      ? { uri: item?.input_videos[0].thumbnail }
                      : DefaultScanImage
                  }
                  onPress={() => onClick(item._id)}
                  key={index}
                  style={{
                    width: width * 0.4,
                    height: height * 0.3,
                  }}
                />
              </View>
            )}
            numColumns={2}
            contentContainerStyle={styles.flatListContentContainer}
            extraData={true}
          />
        </View>
      ) : (
        <EmptyScreen
          label={`No ${
            libraryType === ScansSections.MY_SCANS ? "scans" : "posts"
          } to show`}
          style={{ width, height }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    paddingHorizontal: "5.3%",
    flex: 1,
    backgroundColor: "#fff",
  },
  libraryTypesConainer: {
    width: "100%",
    marginTop: "4%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "4%",
  },
  topHeaderContainer: {
    width: "100%",
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  headerTxtContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
  },
  headingTxt: {
    fontFamily: "Poppins-Regular",
    fontSize: 21,
    fontWeight: "600",
  },
  rightIconsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  topNotification: {
    width: 14,
    height: 14,
    paddingHorizontal: 1,
    paddingVertical: 3,
    position: "absolute",
    backgroundColor: "#7680FF",
    borderRadius: 14 / 2,
    bottom: "40%",
    left: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  typeTxt: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    marginLeft: "4%",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  flatListContentContainer: {
    paddingBottom: "45%",
    alignItems: "flex-start",
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: "0.4%",
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
export default Library;
